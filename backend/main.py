
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import os
from utils import transform_text

# Initialize app
app = FastAPI(title="Spam Detection API")

# Enable CORS (allow frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change this later to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get base directory (important for deployment)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define model paths
model_path = os.path.join(BASE_DIR, "model", "spam_model.pkl")
vectorizer_path = os.path.join(BASE_DIR, "model", "vectorizer.pkl")

# Load model and vectorizer safely
with open(model_path, "rb") as f:
    model = pickle.load(f)

with open(vectorizer_path, "rb") as f:
    vectorizer = pickle.load(f)

# Request schema
class Message(BaseModel):
    text: str

# Root route
@app.get("/")
def home():
    return {"message": "Spam Detection API is running 🚀"}

# Prediction route
@app.post("/predict")
def predict(data: Message):
    try:
        # Preprocess text
        transformed = transform_text(data.text)

        # Convert text to vector
        vector = vectorizer.transform([transformed])

        # Predict
        prediction = model.predict(vector)[0]

        # Get probability
        prob = model.predict_proba(vector)[0][1]

        return {
            "prediction": "Spam" if prediction == 1 else "Not Spam",
            "spam_probability": float(prob)
        }

    except Exception as e:
        return {"error": str(e)}
```
