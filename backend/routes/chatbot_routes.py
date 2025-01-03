from fastapi import APIRouter, HTTPException, Depends, Request, Response, UploadFile, File
import warnings
from pydantic import BaseModel
from fastapi.responses import JSONResponse, StreamingResponse
import os
import uvicorn
import aiofiles
import asyncio
import threading
from pathlib import Path

from models import _constants
from controllers.rag import _upload_files
from controllers.chatbot import _chatbot_eternal

router = APIRouter(
    prefix="/api/v1/chatbot",
    tags=["Chatbot"]
)

warnings.filterwarnings("ignore", message="Api key is used with an insecure connection.")


# =============================================== FILES API ==================================================
##############################################################################################################
@router.post("/upload-files")
@router.post("/upload-files/")
async def upload_files(
        file: UploadFile = File(...),
):
    chatbot_name = _constants.NAME_CHATBOT
    _path = _constants.DATAS_PATH

    path = _path + "/" + chatbot_name
    user_dir = Path(path)
    file_path = user_dir / file.filename

    try:
        _path = _constants.DATAS_PATH

        path = _path + "/" + chatbot_name
        contents = await file.read()

        await file.seek(0)

        # Create user directory if it does not exist
        user_dir = Path(path)
        user_dir.mkdir(parents=True, exist_ok=True)
        file_path = user_dir / file.filename

        # Save the uploaded file to disk in chunks
        chunk_size = 1024 * 1024  # 1MB
        async with aiofiles.open(file_path, "wb") as f:
            for i in range(0, len(contents), chunk_size):
                await f.write(contents[i: i + chunk_size])
                await asyncio.sleep(0.01)  # Thêm thời gian nghỉ nhỏ

        # Process the uploaded file
        loop = asyncio.get_event_loop()
        answer = await loop.run_in_executor(
            None,
            _upload_files.save_vector_db,
            str(file_path),
        )

        content = {
            "status": 200,
            "message": "File uploaded and processed successfully.",
            "data": answer,
        }

        return JSONResponse(content=content, status_code=200)

    except Exception as e:
        print("Error uploading files: ", e)
        content = {"status": 400, "message": "Error uploading files: " + str(e)}

        _path = _constants.DATAS_PATH + "/" + chatbot_name

        file_path = Path(_path) / chatbot_name / file.filename
        threading.Thread(target=remove_file, args=(file_path,)).start()

        return JSONResponse(content=content, status_code=400)

    finally:
        try:
            remove_file(file_path)
        except Exception as e:
            # print("Error removing files: ", e)
            pass

        try:
            os.remove(file_path)
        except FileNotFoundError:
            pass


def remove_file(file_path_rm):
    try:
        if file_path_rm.exists():
            file_path_rm.unlink()
            print("File removed successfully.")
    except PermissionError as e:
        print("File remove error: ", e)
        pass


# ================================================ CHATBOT API ===================================================
class ChatbotRequest(BaseModel):
    query: str


@router.post("")
@router.post("/")
async def chatbot(request: ChatbotRequest):
    try:
        loop = asyncio.get_event_loop()

        answer = await loop.run_in_executor(
            None,
            _chatbot_eternal.chatbot_eternal,
            request.query,
        )

        content = {"status": 200, "message": "success", "data": answer}
        return JSONResponse(content=content, status_code=200)

    except Exception as e:
        content = {"status": 400, "message": "Error: " + str(e)}
        return JSONResponse(content=content, status_code=400)


@router.post("/chatbot-stream")
@router.post("/chatbot-stream/")
async def chatbot_stream(request: Request):
    try:
        body = await request.json()
        query = body.get("query", "")

        loop = asyncio.get_event_loop()

        answer = await loop.run_in_executor(
            None,
            _chatbot_eternal.chatbot_stream,
            query,
        )

        return StreamingResponse(answer, media_type="text/event-stream")

    except Exception as e:
        content = {"status": 400, "message": "Error: " + str(e)}
        return JSONResponse(content=content, status_code=400)
