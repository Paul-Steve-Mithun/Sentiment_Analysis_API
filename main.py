from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from datetime import datetime
import pandas as pd
import io
import math

app = FastAPI()


origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000"  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

analyzer = SentimentIntensityAnalyzer()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Sentiment Analysis API!"}

# Authentication dependency
def authenticate(api_key: str):
    if api_key != "your_api_key":
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return api_key

class SentimentResponse(BaseModel):
    id: int
    text: str
    sentiment: str
    score: float
    timestamp: str = None 

@app.post("/analyze", response_model=SentimentResponse)
def analyze_text(text: str, api_key: str = Depends(authenticate)):
    scores = analyzer.polarity_scores(text)
    sentiment = "positive" if scores['compound'] > 0.3 else "negative" if scores['compound'] < -0.05 else "neutral"
    score = scores['compound']
    if math.isnan(score) or math.isinf(score):
        score = 0.0 
    return {"id": 0, "text": text, "sentiment": sentiment, "score": score, "timestamp": None}

@app.post("/upload_csv")
def upload_csv(file: UploadFile = File(...), api_key: str = Depends(authenticate)):
    try:
        content = file.file.read()
        df = pd.read_csv(io.BytesIO(content))

        if 'id' not in df.columns or 'text' not in df.columns:
            raise ValueError("CSV must contain 'id' and 'text' columns.")
        
        if 'timestamp' in df.columns:
            df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
            df['timestamp'] = df['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S')
        
        results = []
        for _, row in df.iterrows():
            scores = analyzer.polarity_scores(row['text'])
            sentiment = "positive" if scores['compound'] > 0.3 else "negative" if scores['compound'] < -0.05 else "neutral"
            score = scores['compound']
            if math.isnan(score) or math.isinf(score):
                score = 0.0  
            timestamp = row['timestamp'] if pd.notna(row['timestamp']) else None
            results.append({
                "id": row['id'],
                "text": row['text'],
                "sentiment": sentiment,
                "score": score,
                "timestamp": timestamp  
            })
        
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")