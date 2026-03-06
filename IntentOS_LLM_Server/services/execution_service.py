import subprocess
import os
import sys
import shutil
from pathlib import Path
import webbrowser


# Restricted system-level binaries
DANGEROUS_COMMANDS = {
    "shutdown",
    "taskkill",
    "format",
    "regedit",
    "powershell",
    "wmic"
}


# Windows common install directories
PROGRAM_FILES = [
    os.environ.get("ProgramFiles"),
    os.environ.get("ProgramFiles(x86)")
]


def find_windows_app(app_name: str):
    """
    Try to locate executable:
    1. First via system PATH
    2. Then by scanning Program Files directories
    """

    # 1️⃣ Check PATH first
    resolved = shutil.which(app_name)
    if resolved:
        return resolved

    # 2️⃣ Search Program Files folders
    for base in PROGRAM_FILES:
        if not base:
            continue

        for root, dirs, files in os.walk(base):
            for file in files:
                if file.lower().startswith(app_name.lower()) and file.lower().endswith(".exe"):
                    return os.path.join(root, file)

    return None


def execute_intent(intent: str, parameters: dict):

    try:

        # ==========================
        # OPEN APP
        # ==========================
        if intent == "open_app":

            app_name = parameters.get("app_name", "").strip().lower()

            if not app_name:
                return {"status": "error", "message": "App name missing"}

            if app_name in DANGEROUS_COMMANDS:
                return {
                    "status": "error",
                    "message": f"{app_name} is restricted for safety reasons"
                }

            # Windows resolution logic
            if sys.platform == "win32":
                resolved_path = find_windows_app(app_name)
            else:
                resolved_path = shutil.which(app_name)

            if not resolved_path:
                return {
                    "status": "error",
                    "message": f"{app_name} not found on this system"
                }

            # Launch application
            if sys.platform == "win32":
                subprocess.Popen(
                    resolved_path,
                    creationflags=subprocess.CREATE_NEW_CONSOLE
                )
            else:
                subprocess.Popen(resolved_path)

            return {
                "status": "success",
                "message": f"Opened {app_name}"
            }

        # ==========================
        # CREATE FILE
        # ==========================
        elif intent == "create_file":

            filename = parameters.get("filename")

            if not filename:
                return {"status": "error", "message": "Filename missing"}

            safe_path = Path(os.getcwd()) / filename
            safe_path.touch(exist_ok=True)

            return {
                "status": "success",
                "message": f"Created file {filename}"
            }

        # ==========================
        # WEB SEARCH
        # ==========================
        elif intent == "web_search":

            query = parameters.get("query")

            if not query:
                return {"status": "error", "message": "Query missing"}

            url = f"https://www.google.com/search?q={query}"
            webbrowser.open(url)

            return {
                "status": "success",
                "message": f"Searched for {query}"
            }

        # ==========================
        # UNKNOWN
        # ==========================
        return {
            "status": "error",
            "message": "Unknown or unsafe intent"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }