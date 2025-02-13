import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("plant_health_data.csv")  # Replace with your actual dataset
print("Features used for training:", df.columns.tolist())

# Convert timestamp to datetime and extract useful features
df['Timestamp'] = pd.to_datetime(df['Timestamp'])
df['Hour'] = df['Timestamp'].dt.hour
df['Day'] = df['Timestamp'].dt.day
df['Month'] = df['Timestamp'].dt.month
df.drop(columns=['Timestamp'], inplace=True)

# Encode categorical target column
label_encoder = LabelEncoder()
df['Plant_Health_Status'] = label_encoder.fit_transform(df['Plant_Health_Status'])

# Select features and labels
X = df.drop(columns=['Plant_Health_Status'])  # Features
y = df['Plant_Health_Status']  # Labels

# Normalize numerical features
scaler = MinMaxScaler()
X = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Save model and encoders
with open("soil_health_model.pkl", "wb") as model_file:
    pickle.dump(model, model_file)

with open("label_encoder.pkl", "wb") as le_file:
    pickle.dump(label_encoder, le_file)

with open("scaler.pkl", "wb") as scaler_file:
    pickle.dump(scaler, scaler_file)

print("Model and encoders saved successfully!")
