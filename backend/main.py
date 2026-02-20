from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Bank Risk Assessment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


try:
    model_pipeline = joblib.load("loan_risk_model.pkl")
except Exception as e:
    print(f"Error loading model: {e}")

class LoanApplication(BaseModel):
    checking_status: str
    duration: float
    credit_history: str
    purpose: str
    credit_amount: float
    savings_status: str
    employment: str
    installment_commitment: float
    personal_status: str
    other_parties: str
    residence_since: float
    property_magnitude: str
    age: float
    other_payment_plans: str
    housing: str
    existing_credits: float
    job: str
    num_dependents: float
    own_telephone: str
    foreign_worker: str

@app.post("/predict")
async def predict_risk(application: LoanApplication):
    try:

        input_data = pd.DataFrame([application.model_dump()])
        
        prediction = model_pipeline.predict(input_data)[0]
        
        probability = model_pipeline.predict_proba(input_data)[0]
        
        result = "Reject (High Risk)" if prediction == 1 else "Approve (Low Risk)"
        risk_score = round(probability[1] * 100, 2) 
        
        return {
            "decision": result,
            "default_probability": f"{risk_score}%",
            "status_code": 200
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "API is running. Send POST requests to /predict"}