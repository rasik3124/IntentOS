from fastapi import APIRouter
from schemas.request_models import SummarizeRequest
from adapters.ollama_adapter import OllamaAdapter

router = APIRouter()
adapter = OllamaAdapter()

@router.post("/summarize")
def summarize(request: SummarizeRequest):
    prompt = f"Summarize this:\n{request.text}"
    response = adapter.generate(prompt)
    return {"summary": response}