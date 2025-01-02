from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

########################################################################################

# embeddings_model
embeddings_model = OpenAIEmbeddings()

llm = ChatOpenAI(model="gpt-4o", temperature=0.5, streaming=True)


def get_llm_stream():
    return llm
