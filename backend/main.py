from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
from utils import transform_text

app = FastAPI(title="Spam Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model + vectorizer
model = pickle.load(open("model/spam_model.pkl", "rb"))
vectorizer = pickle.load(open("model/vectorizer.pkl", "rb"))


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
        # Preprocess
        transformed = transform_text(data.text)

        # Vectorize
        vector = vectorizer.transform([transformed])

        # Predict
        prediction = model.predict(vector)[0]

        # Probability (optional)
        prob = model.predict_proba(vector)[0][1]

        return {
            "prediction": "Spam" if prediction == 1 else "Not Spam",
            "spam_probability": float(prob)
        }

    except Exception as e:
        return {"error": str(e)}