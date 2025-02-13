from fastapi import FastAPI
import pickle
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Try using "*" to allow all origins temporarily
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model, scaler, and label encoder
with open("./soil_health_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("./label_encoder.pkl", "rb") as le_file:
    label_encoder = pickle.load(le_file)

with open("./scaler.pkl", "rb") as scaler_file:
    scaler = pickle.load(scaler_file)

# Define the input format
class SoilInput(BaseModel):
    moisture: float
    temperature: float
    humidity: float
    light: float
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    conductivity: float
    hour: int
    day: int
    month: int

@app.post("/predict")
async def predict_soil_health(data: SoilInput):
    try:
        # Convert input data to a NumPy array
        input_data = np.array([[data.moisture, data.temperature, data.humidity, data.light, 
                                data.ph, data.nitrogen, data.phosphorus, data.potassium, 
                                data.conductivity, data.hour, data.day, data.month, 0, 0, 0]])

        # Scale input features
        input_data_scaled = scaler.transform(input_data)

        # Make prediction
        prediction = model.predict(input_data_scaled)[0]

        # Convert back to readable label
        health_status = label_encoder.inverse_transform([prediction])[0]
        
        return {"soil_health": health_status}

    except Exception as e:
        return {"error": str(e)}

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
