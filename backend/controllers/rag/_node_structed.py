import uuid
from dotenv import load_dotenv
from collections import OrderedDict
from typing import List
from langchain_core.documents import Document
from langchain_experimental.text_splitter import SemanticChunker
from langchain.text_splitter import CharacterTextSplitter

from app.models import _environments, _constants

load_dotenv()

text_splitter = CharacterTextSplitter(
    separator="\n\n",
    chunk_size=1024,
    chunk_overlap=0
)


def create_node(raw_data_elements):
    doc_contents = []
    doc_ids = []

    texts = ""

    for raw_element in raw_data_elements:
        texts += raw_element.text + "\n"

    # text_splitter = SemanticChunker(_environments.embeddings_model, breakpoint_threshold_type="interquartile")
    docs = text_splitter.create_documents([texts])

    nodes = []

    for doc in docs:
        node_id = str(uuid.uuid4())

        nodes.append({
            "page_content": doc.page_content,
            "metadata": {
                "doc_id": node_id,
            }
        })

    for node in nodes:
        doc_contents.append(Document(page_content=node["page_content"], metadata=node["metadata"]))
        doc_ids.append(node["metadata"]["doc_id"])

    return doc_contents, doc_ids


def is_valid_uuid(s: str) -> bool:
    try:
        # Thử chuyển chuỗi thành UUID
        uuid_obj = uuid.UUID(s)
        # Kiểm tra xem nó có phải là UUID hợp lệ hay không
        return str(uuid_obj) == s
    except ValueError:
        # Nếu không thể chuyển thành UUID, trả về False
        return False


# Lấy danh sách các id 1 node
def get_ids_1_node(docs):
    list_ids = []

    for doc in docs:
        id = doc.metadata["doc_id"]
        ids = [id - 1, id, id + 1]
        ids = [elem for elem in ids if elem != "None"]
        list_ids.append(ids)

    return list_ids


# Lấy danh sách các id 1 node
def get_ids_normal_node(docs):
    list_ids = []

    for doc in docs:
        id = doc.metadata["doc_id"]
        ids = [id]
        ids = [elem for elem in ids if elem != "None"]
        list_ids.append(ids)

    return list_ids


# Lấy danh sách các id 3 node
def get_ids_3_node(docs):
    list_ids = []

    for doc in docs:
        id = doc.metadata["doc_id"]
        ids = [
            id - 3,
            id - 2,
            id - 1,
            id,
            id + 1,
            id + 2,
            id + 3,
        ]
        ids = [elem for elem in ids if elem > 0]
        list_ids.append(ids)

    return list_ids


def check_common_elements(l1, l2):
    return any(elem in l1 for elem in l2)


# Bước 2: Hợp nhất các danh sách có phần tử trùng nhau và sắp xếp tăng dần
def merge_lists(lists):
    merged = []
    visited = [False] * len(lists)

    for i in range(len(lists)):
        if visited[i]:
            continue
        current_merge = lists[i]
        visited[i] = True
        for j in range(i + 1, len(lists)):
            if check_common_elements(current_merge, lists[j]):
                current_merge += [
                    elem for elem in lists[j] if elem not in current_merge
                ]
                visited[j] = True
        merged.append(sorted(current_merge))  # Sắp xếp danh sách hiện tại

    return merged


class OrderedSet:
    def __init__(self, iterable):
        self.items = list(OrderedDict.fromkeys(iterable))

    def __repr__(self):
        return "{" + ", ".join(map(str, self.items)) + "}"


def get_element_data_simple(raw_data_elements):
    datas = []
    pages = []

    for element in raw_data_elements:
        if "unstructured.documents.elements.CompositeElement" in str(type(element)):
            datas.append(str(element))
            page = sorted(
                {e.metadata.page_number for e in element.metadata.orig_elements}
            )
            ordered_set_numbers = OrderedSet(page)
            pages.append(ordered_set_numbers)

    return datas, pages


def split_array(array: List) -> List[List]:
    """Chia mảng thành nhiều phần bằng nhau dựa trên độ dài của mảng.

    Args:
        array (List): Mảng cần chia.

    Returns:
        List[List]: Mảng chứa các phần đã chia.
    """
    length = len(array)
    if length <= 20:
        num_parts = 1
    else:
        num_parts = (length // 10) - 1

    if num_parts == 1:
        return [array]

    avg = length / float(num_parts)
    out = []
    last = 0.0

    while last < length:
        out.append(array[int(last): int(last + avg)])
        last += avg

    return out

