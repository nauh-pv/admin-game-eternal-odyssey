export const convertBase64ImagesToObjectURLs = async (imageList: any) => {
  if (imageList && imageList.length > 0) {
    const images: any = [];
    const fetchPromises = imageList.map((image: any, _: any) => {
      const url = `data:image/png;base64,${image}`;
      return fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "File name", {
            type: "image/png",
          });
          const imageConvert = URL.createObjectURL(file);
          images.push(imageConvert);
        });
    });
    return Promise.all(fetchPromises).then(() => images);
  }

  return Promise.resolve([]);
};
