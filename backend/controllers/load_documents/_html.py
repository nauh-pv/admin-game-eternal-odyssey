from unstructured.partition.html import partition_html


def load_documents(file_path: str):
    raw_elements = partition_html(
        filename=file_path, languages=["vie"], strategy="auto", chunking_strategy="basic"
    )

    return raw_elements
