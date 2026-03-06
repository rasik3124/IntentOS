from fastapi import APIRouter
from schemas.response_models import IntentResponse
from services.execution_service import execute_intent

router = APIRouter()

@router.post("/execute")
async def execute(data: IntentResponse):
    result = execute_intent(
        intent=data.intent,
        parameters=data.parameters
    )
    return result