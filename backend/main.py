from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routes import user_routes, world_routes, chatbot_routes, quest_routes, item_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://admin-game-eternalodyssey.vercel.app", "https://admin-game-eternalodyssey.vercel.app/","http://127.0.0.1:3000/","http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký các routes
app.include_router(user_routes.router)
app.include_router(world_routes.router)
app.include_router(chatbot_routes.router)
app.include_router(quest_routes.router)
app.include_router(item_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Firebase-powered Backend!"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=1945, reload=True)
