from unstructured.partition.docx import partition_docx


def load_documents(file_path: str):
    raw_elements = partition_docx(
        filename=file_path,
    )

    return raw_elements


def load_documents_pro(
    file_path: str,
):
    raw_elements = partition_docx(
        filename=file_path,
        languages=["vie"],
        strategy="auto",
        chunking_strategy="basic",
    )

    return raw_elements

#
# # test load_documents_pro
# raw_elements = load_documents_pro(
#     file_path="D:\\thebang\\works\\tmps\\folders\\Dữ liệu training TLAVKS - Tung-20241203T004431Z-002\\Dữ liệu training TLAVKS - Tung\\BLHS-20241202T104535Z-001\\BLHS\\Công văn\\Công văn 64-TANDTC-PC ngày 03-04-2019\\Công văn số 64_TANDTC-PC ngày 03_04_2019.docx",
# )
#
#
# import re
#
# datas = ""
# datas_split = []
# current_section = ""
#
#
# # Hàm đếm số từ trong một chuỗi
# def count_words(text):
#     return len(text.split())
#
#
# # Duyệt qua từng raw_element
# for raw_element in raw_elements:
#     # Lấy nội dung của raw_element
#     text = raw_element.text.strip()
#     datas += f"{text}\n\n"
#
#     # Kiểm tra nếu dòng bắt đầu bằng số hoặc số La Mã (như 1., II., 2.2., ...)
#     match = re.match(r'^[0-9IVXLCDM]+[\.\)]', text)
#
#     # Kiểm tra số từ trong dòng
#     word_count = count_words(text)
#
#     if word_count > 2048:
#         # Nếu có mục hiện tại, lưu mục hiện tại vào danh sách
#         if current_section:
#             datas_split.append(current_section)
#         # Tạo mục mới với dòng hiện tại
#         current_section = text
#     elif match:
#         # Nếu có mục mới, thêm phần trước vào datas_split (nếu có dữ liệu trong current_section)
#         if current_section:
#             datas_split.append(current_section)
#
#         # Đặt mục hiện tại là mục mới
#         current_section = text
#     else:
#         # Nếu không phải mục mới, tiếp tục thêm thông tin vào mục hiện tại
#         current_section += "\n" + text
#
# # Thêm mục cuối vào danh sách (nếu có)
# if current_section:
#     datas_split.append(current_section)
#
# # In kết quả các mục đã tách
# for section in datas_split:
#     print(section)
#     print("=====================================")
#
# from langchain_experimental.text_splitter import SemanticChunker
#
# text_splitter = SemanticChunker(_environments.embeddings_model, breakpoint_threshold_type="interquartile")
# docs = text_splitter.create_documents([datas])
#
# print("===============================================================================================================")
# print("===============================================================================================================")
# print("===============================================================================================================")
#
# for doc in docs:
#     print(page_content)
#     print("=====================================")


