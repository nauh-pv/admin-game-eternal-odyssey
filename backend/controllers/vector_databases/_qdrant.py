import json
import os
import requests
from langchain_qdrant import Qdrant
from concurrent.futures import ThreadPoolExecutor, as_completed

from models import _constants, _environments, _ultils


def save_vector_db_as_ids_single(docs, collection_name, point_ids):
    qdrant_doc = Qdrant.from_documents(
        documents=docs,
        embedding=_environments.embeddings_model,
        url=_constants.QDRANT_SERVER,
        prefer_grpc=False,
        collection_name=collection_name,
        api_key=_constants.QDRANT_API_KEY,
        ids=point_ids,
    )

    return qdrant_doc


def split_docs_into_chunks(docs, chunk_size=10):
    """
    Chia danh sách docs thành các phần nhỏ, mỗi phần có tối đa `chunk_size` phần tử.
    Nếu docs ít hơn chunk_size thì không chia.
    """
    # Nếu mảng docs ít hơn chunk_size thì trả về nguyên mảng luôn
    if len(docs) <= chunk_size:
        return [docs]

    # Chia mảng thành các phần nhỏ
    chunks = [docs[i:i + chunk_size] for i in range(0, len(docs), chunk_size)]

    return chunks


def save_vector_db_as_ids(docs, collection_name, point_ids):
    """
    Lưu các phần tử docs và point_ids thành các chunks và lưu vào cơ sở dữ liệu một cách tối ưu.
    """

    if len(docs) != len(point_ids):
        raise ValueError("Số lượng docs và point_ids không khớp!")

    file_chunk_size = len(docs)

    def save_chunks(docs, point_ids, chunk_size):
        """Lưu các chunks vào DB và xử lý lỗi nếu xảy ra."""
        qdrant_docs = []

        # Chia docs và point_ids thành các chunk nhỏ
        doc_chunks = split_docs_into_chunks(docs, chunk_size)
        point_id_chunks = split_docs_into_chunks(point_ids, chunk_size)

        for i, (doc_chunk, point_id_chunk) in enumerate(zip(doc_chunks, point_id_chunks)):
            try:
                print(f"Saving chunk {i + 1} with size {len(doc_chunk)}...")
                # Lưu chunk hiện tại vào database
                qdrant_doc = save_vector_db_as_ids_single(
                    doc_chunk, collection_name, point_id_chunk
                )
                qdrant_docs.append(qdrant_doc)

            except Exception as e:
                print(f"Error on chunk {i + 1}: {e}")

                # Nếu chunk thất bại, thử lại với kích thước nhỏ hơn (chia đôi)
                if chunk_size > 1:
                    new_chunk_size = max(1, chunk_size // 2)
                    print(f"Retrying chunk {i + 1} with smaller chunk size {new_chunk_size}...")
                    qdrant_docs += save_chunks(doc_chunk, point_id_chunk, new_chunk_size)
                # else:
                    # print(f"Failed to save chunk {i + 1}. Skipping...")

        return qdrant_docs

        # Bắt đầu lưu với kích thước chunk do người dùng truyền vào

    try:
        return save_chunks(docs, point_ids, file_chunk_size)
    except Exception as e:
        print(f"Final error: {e}")
        return []


def save_vector_db(docs, collection_names):
    qdrant_docs = Qdrant.from_documents(
        documents=docs,
        embedding=_environments.embeddings_model,
        url=_constants.QDRANT_SERVER,
        prefer_grpc=False,
        collection_name=collection_names,
        api_key=_constants.QDRANT_API_KEY,
    )
    return qdrant_docs


def load_vector_db(collection_names):
    try:
        client = Qdrant.from_existing_collection(
            embedding=_environments.embeddings_model,
            collection_name=collection_names,
            url=_constants.QDRANT_SERVER,
            api_key=_constants.QDRANT_API_KEY,
        )
        return client
    except Exception:
        a = "None"
        return a


def similarity_search_qdrant_data(db, query, k=3):
    docs = db.similarity_search(query=query, k=k)
    return docs


def similarity_search_qdrant_data_with_score(db, query, k=3):
    docs = db.similarity_search_with_score(query=query, k=k)
    return docs


def max_marginal_relevance_search_qdrant_data(db, query, k=3, fetch_k=3):
    docs = db.max_marginal_relevance_search(query=query, k=k, fetch_k=fetch_k)
    return docs


def get_point_from_ids(db, collection_name, point_ids):
    id = db.client.retrieve(collection_name=collection_name, ids=point_ids)
    return id


def as_retriever(db):
    db.as_retriever(
        search_kwargs={"k": 20, "score_threshold": 0.5},
        search_type="similarity_score_threshold",
    )


def save_list_nodes_qdrant(node_name, file_name):
    chatbot_name = _constants.NAME_CHATBOT
    _path = _constants.DATAS_PATH

    path = _path + "/" + chatbot_name
    json_file_path = f"{path}/list_nodes_qdrant.json"

    # Tạo thư mục nếu chưa tồn tại
    os.makedirs(os.path.dirname(json_file_path), exist_ok=True)

    # Đọc dữ liệu hiện có từ file JSON
    if os.path.exists(json_file_path):
        with open(json_file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
    else:
        data = []

    # Kiểm tra nếu đã có node_name trong danh sách, thì tăng count lên 1, nếu không thì thêm mới
    for item in data:
        if item["node_name"] == node_name:
            item["count"] = item.get("count", 0) + 1  # Nếu có, tăng count lên 1
            break
    else:
        # Nếu không có node_name, thêm mới thông tin vào danh sách
        data.append({"node_name": node_name, "file_name": file_name, "count": 1})

    # Ghi lại dữ liệu vào file JSON
    with open(json_file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    return


def filter_node_names(keyword):
    chatbot_name = _constants.NAME_CHATBOT
    _path = _constants.DATAS_PATH

    path = _path + "/" + chatbot_name
    json_file_path = f"{path}/list_nodes_qdrant.json"

    # Mở file JSON và đọc dữ liệu
    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Tạo một danh sách để chứa node_name có keyword
    filtered_node_names = []

    # Nếu keyword là "ALL", trả về tất cả các node_name
    if keyword == "ALL":
        return [item.get("node_name", "") for item in data]

    # Lọc tất cả các node_name khớp chính xác với keyword
    for item in data:
        node_name = item.get("node_name", "")
        # Kiểm tra nếu keyword khớp chính xác một phần trong node_name
        if keyword in node_name.split("_"):
            filtered_node_names.append(node_name)

    return filtered_node_names


def clean_string(s):
    # Xóa tất cả khoảng trắng và các ký tự đặc biệt ở đầu và cuối chuỗi
    cleaned = s.strip(" -+,.*/\\|!@#$%^&()[]{}<>?")
    return cleaned