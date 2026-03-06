from fastapi import APIRouter
from schemas.request_models import ChatRequest
from adapters.ollama_adapter import OllamaAdapter

router = APIRouter()
adapter = OllamaAdapter()

@router.post("/chat")
def chat(request: ChatRequest):
    response = adapter.generate(request.message)
    return {"response": response}