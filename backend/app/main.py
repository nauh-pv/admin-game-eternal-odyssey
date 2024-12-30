from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import user_routes, world_routes

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

@app.get("/")
def read_root():
    return {"message": "Welcome to the Firebase-powered Backend!"}
