import requests
from config import OLLAMA_URL, MODEL_NAME
from .base_adapter import BaseLLMAdapter

class OllamaAdapter(BaseLLMAdapter):

    def generate(self, prompt: str) -> str:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False
            }
        )
        data = response.json()
        return data["response"]