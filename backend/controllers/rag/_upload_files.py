from dotenv import load_dotenv
from threading import Lock
import threading
import os

from models import _constants
from controllers.vector_databases import _qdrant
from controllers.rag import _node_structed, _clean_data
from controllers.load_documents import (
    _pdf,
    _docx,
    _txt,
    _code,
    _csv,
    _doc,
    _html,
    _md,
    _xlsx,
)

lock = Lock()

load_dotenv()


def save_vector_db(file_path):
    file_extension = file_path.split(".")[-1].lower()
    loaders = {
        "pdf": _pdf.load_documents,
        "js": _code.load_documents,
        "py": _code.load_documents,
        "java": _code.load_documents,
        "cpp": _code.load_documents,
        "cc": _code.load_documents,
        "cxx": _code.load_documents,
        "c": _code.load_documents,
        "cs": _code.load_documents,
        "php": _code.load_documents,
        "rb": _code.load_documents,
        "swift": _code.load_documents,
        "ts": _code.load_documents,
        "go": _code.load_documents,
        "csv": _csv.load_documents,
        "docx": _docx.load_documents_pro,
        "doc": _docx.load_documents,
        "html": _html.load_documents,
        "md": _md.load_documents,
        "txt": _txt.load_documents,
        "text": _txt.load_documents,
        "log": _txt.load_documents,
        "xlsx": _xlsx.load_documents,
        "xls": _xlsx.load_documents,
    }

    if file_extension in loaders:
        raw_elements = loaders[file_extension](file_path)
    else:
        raise ValueError(f"Unsupported file type: .{file_extension}")

    file_name = file_path.split("\\")[-1]
    file_name = file_name.split("/")[-1]
    file_name, extension = os.path.splitext(file_name)

    doc_contents, doc_ids = _node_structed.create_node(raw_elements)

    print("Length of doc_contents: ", len(doc_contents))
    print("Length of doc_ids: ", len(doc_ids))

    node_name = f"{_constants.NAME_CHATBOT}"

    _qdrant.save_vector_db_as_ids(doc_contents, node_name, doc_ids)

    threading.Thread(
        target=_qdrant.save_list_nodes_qdrant,
        args=(
            node_name,
            file_name
        ),
    ).start()

    doc_contents = _clean_data.validate_and_fix_braces(doc_contents)
    return doc_contents

