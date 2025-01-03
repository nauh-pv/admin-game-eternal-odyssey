from fastapi import Request, HTTPException, Depends
from firebase_admin import auth

def verify_id_token_dependency(request: Request):
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            raise HTTPException(status_code=401, detail="Authorization header is missing")

        if not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Authorization header must start with 'Bearer'")

        id_token = auth_header.split(" ")[1]
        if not id_token:
            raise HTTPException(status_code=401, detail="Bearer token is missing")

        decoded_token = auth.verify_id_token(id_token)
        print("Đây là: ",decoded_token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid or expired token: {str(e)}")
