from fastapi import FastAPI
from app.routes import user_routes, world_routes

app = FastAPI()

# Đăng ký các routes
app.include_router(user_routes.router)
app.include_router(world_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Firebase-powered Backend!"}
