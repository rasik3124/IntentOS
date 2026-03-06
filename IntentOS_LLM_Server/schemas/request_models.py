from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

class IntentRequest(BaseModel):
    message: str

class SummarizeRequest(BaseModel):
    text: str