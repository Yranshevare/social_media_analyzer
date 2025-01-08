from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from dotenv import load_dotenv
import json
import requests
import warnings
import os

# Load environment variables
load_dotenv()

clients: List[WebSocket] = []

# Retrieve environment variables
BASE_API_URL = os.getenv("BASE_API_URL", "http://default-api-url")
LANGFLOW_ID = os.getenv("LANGFLOW_ID", "default-langflow-id")
FLOW_ID = os.getenv("FLOW_ID", "default-flow-id")
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN", "default-token")

# Default tweaks configuration
TWEAKS = {
    "ChatOutput-1glkW": {},
    "ChatInput-1bSiF": {},
    "Prompt-J0Ohy": {},
    "GoogleGenerativeAIModel-ZfdWq": {},
    "AstraDB-Vxusu": {},
    "ParseData-XH3z1": {},
    "File-uXhFM": {},
    "SplitText-9zT71": {},
    "AstraDB-054xX": {}
}

app = FastAPI()

class FlowInput(BaseModel):
    message: str
    endpoint: Optional[str] = FLOW_ID
    tweaks: Optional[dict] = TWEAKS
    application_token: Optional[str] = APPLICATION_TOKEN
    output_type: str = "chat"
    input_type: str = "chat"
    upload_file: Optional[str] = None
    components: Optional[str] = None

def run_flow(message: str,
             endpoint: str,
             output_type: str = "chat",
             input_type: str = "chat",
             tweaks: Optional[dict] = None,
             application_token: Optional[str] = None) -> dict:
    """Runs a flow using LangFlow API."""
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{endpoint}"
    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    headers = {
        "Authorization": f"Bearer {application_token}",
        "Content-Type": "application/json"
    } if application_token else None
    try:
        response = requests.post(api_url, json=payload, headers=headers, timeout=60)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.Timeout:
        return {"error": "The request to LangFlow timed out. Please try again later."}
    except requests.exceptions.RequestException as e:
        return {"error": f"Request error: {str(e)}"}

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    print("inside the websocket")
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Received message: {data}")
            response = run_flow(
                message=data,
                endpoint=FLOW_ID,
                output_type="chat",
                input_type="chat",
                application_token=APPLICATION_TOKEN
            )
            print("response: " + json.dumps(response))
            await websocket.send_text(json.dumps(response))
    except WebSocketDisconnect:
        clients.remove(websocket)
        print("WebSocket client disconnected")
    except Exception as e:
        clients.remove(websocket)  # Ensure the client is removed on any error
        print(f"Error: {e}")
        await websocket.close(code=1011)

@app.get("/")
async def root():
    return {"message": "WebSocket-based LangFlow API is running"}
