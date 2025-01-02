from unstructured.partition.text import partition_text


def load_documents(file_path: str):
    # Determine the file extension
    file_extension = file_path.split('.')[-1].lower()

    # Supported file extensions
    supported_extensions = ["js", "py", "java", "cpp", "cc", "cxx", "c", "cs", "php", "rb", "swift", "ts", "go"]

    # Check if the file extension is supported
    if file_extension not in supported_extensions:
        raise ValueError(f"Unsupported file type: .{file_extension}")

    # Partition the text from the file
    raw_elements = partition_text(
        filename=file_path, languages=["vie"], strategy="auto", chunking_strategy="basic"
    )

    return raw_elements
