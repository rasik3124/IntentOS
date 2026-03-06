from pydantic import BaseModel
from typing import Dict, Optional


class IntentResponse(BaseModel):
    mode: str
    intent: Optional[str] = None
    parameters: Dict[str, str] = {}
    reply: str