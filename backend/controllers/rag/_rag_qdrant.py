from dotenv import load_dotenv
from collections import OrderedDict
from controllers.vector_databases import _qdrant

load_dotenv()


class OrderedSet:
    def __init__(self, iterable):
        self.items = list(OrderedDict.fromkeys(iterable))

    def __repr__(self):
        return "{" + ", ".join(map(str, self.items)) + "}"


def retriever_question(db, query):
    retrievers = ""

    try:
        docs = _qdrant.similarity_search_qdrant_data(db, query, 5)

        for doc in docs:
            page_content = str(doc.page_content)
            retrievers += page_content + "\n\n"

        return retrievers
    except Exception as e:
        print("Error retriever_question: ", e)
        return retrievers


def load_vector_db(node_name):
    db = _qdrant.load_vector_db(node_name)
    return db
