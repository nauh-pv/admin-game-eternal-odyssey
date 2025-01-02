from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.routes import user_routes, world_routes, chatbot_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký các routes
app.include_router(user_routes.router)
app.include_router(world_routes.router)
app.include_router(chatbot_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Firebase-powered Backend!"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=1945, reload=True)
