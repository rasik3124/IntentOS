from fastapi import APIRouter
from schemas.request_models import IntentRequest
from schemas.response_models import IntentResponse
from adapters.ollama_adapter import OllamaAdapter
from utils.prompt_builder import build_intent_prompt
from utils.json_cleaner import extract_json

router = APIRouter()
adapter = OllamaAdapter()

ALLOWED_INTENTS = {
    "open_app": ["app_name"],
    "create_file": ["filename"],
    "web_search": ["query"],
    "open_file": ["file_path"],
    "search_folder": ["folder_name"],
}


@router.post("/intent", response_model=IntentResponse)
def extract_intent(request: IntentRequest):

    prompt = build_intent_prompt(request.message)
    raw_response = adapter.generate(prompt)

    parsed = extract_json(raw_response)

    # If model fails to return JSON
    if not parsed:
        return IntentResponse(
            mode="conversation",
            intent=None,
            parameters={},
            reply="Sorry, I couldn't understand that clearly."
        )

    mode = parsed.get("mode", "conversation")
    intent = parsed.get("intent")
    parameters = parsed.get("parameters", {})
    reply = parsed.get("reply", "")

    # -----------------------------
    # Conversation Mode
    # -----------------------------
    if mode == "conversation":
        return IntentResponse(
            mode="conversation",
            intent=None,
            parameters={},
            reply=reply if reply else "I'm here to help."
        )

    # -----------------------------
    # Action Mode Validation
    # -----------------------------
    if intent not in ALLOWED_INTENTS:
        return IntentResponse(
            mode="conversation",
            intent=None,
            parameters={},
            reply="That action is not supported."
        )

    required_params = ALLOWED_INTENTS[intent]

    for param in required_params:
        if param not in parameters:
            return IntentResponse(
                mode="conversation",
                intent=None,
                parameters={},
                reply=f"Missing required parameter: {param}"
            )

    return IntentResponse(
        mode="action",
        intent=intent,
        parameters=parameters,
        reply=reply if reply else "Executing your request."
    )