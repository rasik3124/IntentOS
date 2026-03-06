import json
import re

def extract_json(text: str):
    try:
        # Try direct parse first
        return json.loads(text)
    except:
        pass

    # Extract JSON using regex
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except:
            pass

    return None