from unstructured.partition.xlsx import partition_xlsx


def load_documents(file_path: str):
    raw_elements = partition_xlsx(
        filename=file_path, languages=["vie"], strategy="auto"
    )

    return raw_elements


# path = "./"
#
# text = load_documents(path)
#
# # In ra nội dung của text
# for element in text:
#     print(str(type(element)))
