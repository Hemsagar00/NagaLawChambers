"""
Naga Law Chambers — minimal FastAPI backend.

Exposes:
  GET  /api/health         — liveness probe
  POST /api/inquiries      — store a contact-form submission in MongoDB
  GET  /api/inquiries      — list submissions (requires X-Admin-Token header)

All endpoints are prefixed with /api so Emergent's ingress routes them to :8001.
"""

from __future__ import annotations

import os
from datetime import datetime, timezone
from typing import Annotated, Any

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, EmailStr, Field

load_dotenv()

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "naga-admin-2026")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


class InquiryIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    service: str | None = Field(default=None, max_length=80)
    message: str = Field(min_length=5, max_length=4000)


class InquiryOut(BaseModel):
    id: PyObjectId = Field(alias="_id")
    name: str
    email: EmailStr
    phone: str | None = None
    service: str | None = None
    message: str
    created_at: str
    ip: str | None = None
    user_agent: str | None = None

    class Config:
        populate_by_name = True


app = FastAPI(title="Naga Law Chambers API", version="2.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "naga-law-chambers"}


@app.post("/api/inquiries", status_code=status.HTTP_201_CREATED)
async def create_inquiry(payload: InquiryIn, request: Request) -> dict[str, Any]:
    doc = {
        **payload.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "ip": request.client.host if request.client else None,
        "user_agent": request.headers.get("user-agent"),
    }
    result = await db.inquiries.insert_one(doc)
    return {"id": str(result.inserted_id), "status": "received"}


@app.get("/api/inquiries")
async def list_inquiries(
    x_admin_token: str | None = Header(default=None),
    limit: int = 100,
) -> list[InquiryOut]:
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")
    cursor = db.inquiries.find().sort("created_at", -1).limit(min(limit, 500))
    items: list[InquiryOut] = []
    async for d in cursor:
        d["_id"] = str(d["_id"])
        items.append(InquiryOut.model_validate(d))
    return items
