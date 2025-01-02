from unstructured.partition.text import partition_text


def load_documents(file_path: str):
    raw_elements = partition_text(
        filename=file_path, languages=["vie"], strategy="auto", chunking_strategy="basic"
    )

    return raw_elements
