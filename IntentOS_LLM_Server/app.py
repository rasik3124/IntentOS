from fastapi import FastAPI
from routes.chat import router as chat_router
from routes.intent import router as intent_router
from routes.summarize import router as summarize_router
from fastapi.middleware.cors import CORSMiddleware
from routes import execute

app = FastAPI(title="IntentOS LLM Server")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)
app.include_router(intent_router)
app.include_router(summarize_router)
app.include_router(execute.router)