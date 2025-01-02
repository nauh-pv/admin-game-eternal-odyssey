import os
import re
import json
import pandas as pd
from threading import Lock
from unstructured.partition.pdf import partition_pdf

lock = Lock()


# Lưu nội dung vào file
def save_content_to_file(content, file_path):
    try:
        os.makedirs(os.path.dirname(file_path), exist_ok=True)

        with open(file_path, "w", encoding="utf-8") as file:
            file.write(str(content))
        print(f"Content saved to {file_path} successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")
        pass


# Đọc nội dung từ file total point
def read_totals_point_from_file(file_path):
    total = 0
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
        print(f"Content read from {file_path} successfully.")
        total = int(content)
    except Exception as e:
        print(f"An error occurred: {e}")
        pass
    return total


# Đọc nội dung từ file
def read_content_from_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
        print(f"Content read from {file_path} successfully.")
        return content
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
