def build_intent_prompt(user_input: str) -> str:
    return f"""
You are an intelligent desktop AI assistant.

Decide whether the user wants:
1. A system action
2. Or just conversation

Return ONLY valid JSON in this format:

{{
  "mode": "action" or "conversation",
  "intent": "open_app | create_file | web_search | open_file | search_folder | null",
  "parameters": {{ }},
  "reply": "natural response to the user"
}}

Rules:
- Understand spelling mistakes.
- Extract only ONE primary actionable intent.
- If unsafe or destructive request, use mode="conversation".
- Always include a reply.

User input:
{user_input}
"""