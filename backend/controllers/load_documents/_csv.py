from unstructured.partition.csv import partition_csv


def load_documents(file_path: str):
    raw_elements = partition_csv(
        filename=file_path, languages=["vie"], strategy="auto", chunking_strategy="basic"
    )
    return raw_elements


# path = "C:/Users/ASUS TUF/Downloads/khach-hang-spa.csv"
#
# text = load_documents(path)
#
# # In ra nội dung của text
# for element in text:
#     print(element)
