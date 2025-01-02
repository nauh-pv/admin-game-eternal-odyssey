# import os
# import win32com.client as win32
# from controllers.load_documents import _docx
#
#
# # Hàm kiểm tra và chuyển đổi từ .doc sang .docx
# def convert_doc_to_docx(file_path):
#     # Chuyển đường dẫn tương đối thành tuyệt đối
#     file_path = os.path.abspath(file_path)
#
#     if file_path.lower().endswith(".doc"):
#         # Khởi tạo ứng dụng Word
#         doc = win32.Dispatch("Word.Application")
#         doc.Visible = False  # Không hiển thị cửa sổ Word
#         try:
#             word_document = doc.Documents.Open(file_path)
#
#             # Lưu lại dưới định dạng DOCX
#             docx_path = file_path.replace(".doc", ".docx")
#             word_document.SaveAs(docx_path, FileFormat=16)  # FileFormat=16 là DOCX
#             word_document.Close()
#
#             os.remove(file_path)
#
#             return docx_path  # Trả về đường dẫn tệp DOCX đã chuyển đổi
#         except Exception as e:
#             print(f"Error converting {file_path}: {e}")
#             return None
#         finally:
#             doc.Quit()  # Đảm bảo đóng ứng dụng Word
#     else:
#         # Nếu không phải DOC, trả về đường dẫn gốc (cho DOCX)
#         return file_path
#
#
# def load_documents(file_path: str):
#     print(f"Loading documents from {file_path}")
#     converted_file_path = convert_doc_to_docx(file_path)
#     print(f"Converted file path: {converted_file_path}")
#     raw_data_elements = _docx.load_documents_pro(converted_file_path)
#
#     return raw_data_elements
