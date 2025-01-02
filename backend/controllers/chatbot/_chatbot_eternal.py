from dotenv import load_dotenv
import threading
import uuid
import re

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

from controllers.rag import _clean_data

from app.models import _environments, _prompts, _constants
from controllers.rag import _rag_qdrant, _history
from controllers.vector_databases import _qdrant

load_dotenv()


############################################################################################################
def chatbot_eternal(
        query,
):
    db = _rag_qdrant.load_vector_db(_constants.NAME_CHATBOT)
    retrievers = _rag_qdrant.retriever_question(db, query)

    # if session_id == "":
    #     session_id = str(uuid.uuid4())
    # history = _history.get_history(session_id)
    # history_context = "\n".join(
    #     [f"Q: {item['query']}\nA: {item['answer']}" for item in history]
    # )
    # history_context = _clean_data.validate_and_fix_braces(history_context)

    contexts = _clean_data.validate_and_fix_braces(retrievers)

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                _prompts.CHATBOT_ETERNAL.format(
                    query=str(query),
                    context=str(contexts),
                    history=str(""),
                ),
            ),
        ]
    )

    chain = (
            prompt
            | _environments.get_llm_stream()
            | StrOutputParser()
    )

    answer = chain.invoke({"input": str(query)})

    # threading.Thread(
    #     target=_history.save_history,
    #     args=(session_id, query, answer),
    # ).start()

    return answer


def chatbot_stream(
        query,
):
    db = _rag_qdrant.load_vector_db(_constants.NAME_CHATBOT)
    retrievers = _rag_qdrant.retriever_question(db, query)

    history_context = ""

    contexts = _clean_data.validate_and_fix_braces(retrievers)

    _prompt = _prompts.CHATBOT_ETERNAL.format(query=str(query), context=str(contexts), history=str(history_context))

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", _prompt),
        ]
    )

    chain = (
            prompt | _environments.get_llm_stream() | StrOutputParser()
    )

    answer = ""

    async def generate_chat_responses(message):
        nonlocal answer
        previous_was_number = False  # Biến trạng thái để lưu trữ xem chunk trước có phải là số không

        async for chunk in chain.astream(message):
            content = chunk.replace("\n", "<br>")

            # Kiểm tra nếu content là một chuỗi số (có thể có leading zeros)
            if re.match(r"^\d+$", content):  # Nếu content là chuỗi số
                if not previous_was_number:  # Nếu trước đó không phải là số
                    content = " " + content  # Thêm một dấu cách trước chuỗi số
                previous_was_number = True  # Cập nhật trạng thái là số
            else:
                previous_was_number = False  # Nếu không phải số, đặt lại trạng thái

            answer += content
            yield content
        return

    return generate_chat_responses({"input": str(query)})
