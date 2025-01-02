from unstructured.partition.md import partition_md


def load_documents(file_path: str):
    raw_elements = partition_md(
        filename=file_path, languages=["vie"], strategy="auto", chunking_strategy="basic"
    )

    return raw_elements
