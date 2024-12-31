import { convertBase64ImagesToObjectURLs } from "./convertBase64ToURL";

const hanldeDisplayStreamAnswer = async (
  res: any,
  indexChat: any,
  updateLastReplyText: any,
  updateLastReplyImage: any,
  addMessageChart: any
) => {
  const decoder = new TextDecoder("utf-8");
  let done = false;
  let chunks = [];
  let base64Images = [];
  let base64Data = "";
  let base64Collecting = false;
  let imageConvert = [];
  let chartCollecting = false;
  let chartData = "";
  while (!done) {
    const { value, done: readerDone } = await res.read();
    done = readerDone;
    if (value) {
      let chunk = decoder.decode(value, { stream: true });

      if (chunk.match(/\n\s*\n/)) {
        chunk = chunk.replace(/\n\s*\n/g, "");
      }
      chunk = chunk
        .replace(/data:\s{2}/g, " ")
        .replace(/data:\s*/g, "")
        .replace(/\n/g, "");

      while (chunk.length > 0) {
        if (chunk.includes("---base64_images---")) {
          // Kết thúc chuỗi base64 hiện tại nếu đang thu thập
          if (base64Collecting) {
            // Kết thúc thu thập khi có dấu kết thúc trước khi bắt đầu chuỗi mới
            const endIdx = chunk.indexOf("---end_base64_images---");
            if (endIdx !== -1) {
              base64Data += chunk.substring(0, endIdx).replace(/\s+/g, "");
              base64Images.push(base64Data);
              base64Data = "";
              base64Collecting = false;

              // Cập nhật chunk để bỏ qua phần `---end_base64_images---`
              chunk = chunk.substring(
                endIdx + "---end_base64_images---".length
              );
            }
          }

          // Xử lý bắt đầu chuỗi base64 mới
          const startIdx =
            chunk.indexOf("---base64_images---") + "---base64_images---".length;
          base64Collecting = true;
          base64Data = chunk.substring(startIdx).replace(/\s+/g, "");

          // Nếu chuỗi này cũng có `---end_base64_images---` trong cùng chunk
          if (chunk.includes("---end_base64_images---")) {
            const endIdx = chunk.indexOf("---end_base64_images---");
            base64Data = base64Data.substring(0, endIdx).replace(/\s+/g, "");
            base64Images.push(base64Data);
            base64Data = "";
            base64Collecting = false;

            // Xử lý phần còn lại của chunk sau `---end_base64_images---`
            chunk = chunk.substring(endIdx + "---end_base64_images---".length);
          } else {
            chunk = ""; // Nếu chưa có dấu kết thúc, tiếp tục thu thập
          }
        } else if (
          chunk.includes("---end_base64_images---") &&
          base64Collecting
        ) {
          // Trường hợp chỉ có `---end_base64_images---` trong chunk
          const endIdx = chunk.indexOf("---end_base64_images---");
          base64Data += chunk.substring(0, endIdx).replace(/\s+/g, "");
          base64Images.push(base64Data);

          // Reset lại các biến sau khi kết thúc thu thập
          base64Collecting = false;
          base64Data = "";

          // Cập nhật chunk để bỏ qua `---end_base64_images---`
          chunk = chunk.substring(endIdx + "---end_base64_images---".length);
        } else if (base64Collecting) {
          // Nếu đang thu thập base64 mà chunk không chứa kết thúc
          base64Data += chunk.replace(/\s+/g, "");
          chunk = ""; // Đặt chunk rỗng để tiếp tục thu thập ở các phần tiếp theo
        } else {
          // Nếu không có base64 marker nào, thoát khỏi vòng lặp
          break;
        }
      }

      //xử lý cắt ghép chart
      if (chunk.includes("---chart---")) {
        chartCollecting = true;
        const startIdx = chunk.indexOf("---chart---") + "---chart---".length;
        chartData += chunk.substring(startIdx);
        if (chunk.includes("---end_chart---")) {
          chartCollecting = false;
          chartData = chartData.replace("---end_chart---", "");
        }
      } else if (chunk.includes("---end_chart---") && chartCollecting) {
        const endIdx = chunk.indexOf("---end_chart---");
        chartData += chunk.substring(0, endIdx);
        chartCollecting = false;
      } else if (chartCollecting) {
        chartData += chunk;
      } else {
        chunks.push(chunk);
      }

      if (!base64Collecting && !chartCollecting && chunks.length > 0) {
        const accumulatedText = chunks.join("");
        updateLastReplyText(accumulatedText, indexChat);
      }
      if (!chartCollecting && chartData && chartData.length > 0) {
        addMessageChart("answer", chartData, indexChat);
      }
    }
  }

  if (base64Images.length > 0 && !base64Collecting) {
    imageConvert = await convertBase64ImagesToObjectURLs(base64Images);
    if (imageConvert && imageConvert.length > 0) {
      updateLastReplyImage(imageConvert, indexChat);
    }
  }
};

export { hanldeDisplayStreamAnswer };
