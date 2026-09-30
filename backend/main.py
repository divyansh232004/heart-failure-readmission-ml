from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from pathlib import Path


# ==================================================
# Load ML Model
# ==================================================

MODEL_PATH = Path(__file__).resolve().parent / "readmission_model.pkl"

model = joblib.load(MODEL_PATH)

print("ML model loaded successfully!")


# ==================================================
# FastAPI Application
# ==================================================

app = FastAPI(
    title="Heart Failure Readmission Prediction API",
    description="Predicts 30-day hospital readmission using Machine Learning",
    version="1.0.0"
)


# ==================================================
# CORS
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================================================
# Patient Input Model
# ==================================================

class PatientData(BaseModel):

    # Numeric features

    Age: float
    BMI: float
    Exercise_Frequency: float
    Hypertension: float
    Diabetes: float
    Chronic_Kidney_Disease: float
    Coronary_Artery_Disease: float
    Previous_Stroke: float
    Atrial_Fibrillation: float
    Previous_HF_Admissions: float
    Previous_Hospital_Admissions: float
    NYHA_Class: float
    Ejection_Fraction: float
    Systolic_BP: float
    Diastolic_BP: float
    Heart_Rate: float
    Oxygen_Saturation: float
    Creatinine: float
    Sodium: float
    Potassium: float
    Hemoglobin: float
    Blood_Glucose: float
    BNP: float
    Length_of_Stay: float
    ICU_Admission: float
    Emergency_Admission: float
    Beta_Blocker: float
    ACE_ARB: float
    Diuretic: float
    SGLT2_Inhibitor: float

    # Categorical features

    Gender: str
    Smoking_Status: str
    Alcohol_Consumption: str
    Heart_Failure_Type: str


# ==================================================
# Home Route
# ==================================================

@app.get("/")
def home():

    return {
        "message": "Heart Failure Readmission API is working!",
        "model_loaded": True
    }


# ==================================================
# Health Check
# ==================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": True
    }


# ==================================================
# Prediction Endpoint
# ==================================================

@app.post("/predict")
def predict(patient: PatientData):

    # Convert Pydantic object to dictionary
    patient_data = patient.model_dump()

    # Convert dictionary to DataFrame
    input_data = pd.DataFrame([patient_data])

    # Make prediction
    prediction = model.predict(input_data)[0]

    # Get probability
    probability = model.predict_proba(input_data)[0][1]

    # Convert prediction to readable text
    if prediction == 1:

        result = "Readmitted within 30 days"

    else:

        result = "Not readmitted within 30 days"

    return {
        "prediction": int(prediction),
        "result": result,
        "readmission_probability": round(
            float(probability),
            4
        ),
        "readmission_probability_percent": round(
            float(probability) * 100,
            2
        )
    }