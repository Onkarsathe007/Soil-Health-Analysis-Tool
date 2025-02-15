Soil Health Analysis is a project that helps in assessing soil quality using machine learning. It consists of a **FastAPI** backend and a **React-based frontend** to provide an interactive and efficient user interface. This project is created as a part of the hackathon organized by TPO VIIT Pune.

For more information about the problem statement, visit [this link](https://sites.google.com/viit.ac.in/departmental-hackathon/6e686).

## Project Structure

```
Soil-Health-Analysis/
│── fastapi-server/             # Backend (FastAPI server)
│   │── __pycache__/           # Compiled Python files
│   │── .gitignore             # Git ignore file
│   │── label_encoder.pkl      # Label encoder model
│   │── plant_health_data/     # Data directory
│   │── requirements.txt       # Python dependencies
│   │── scaler.pkl             # Scaler model
│   │── server.py              # Main FastAPI server
│   │── soil_health_model.pkl  # Trained soil health model
│   │── train_model.py         # Training script
│
│── frontend/                  # Frontend (React application)
│   │── node_modules/          # Dependencies
│   │── public/                # Public assets
│   │── soil-health-analysis/  # Project directory
│   │── src/                   # Source code
│   │── .gitignore             # Git ignore file
│   │── eslint.config.js       # ESLint configuration
│   │── index.html             # Main HTML file
```

## How to Run the Project

### 1. Clone the Repository
```sh
git clone https://github.com/Onkarsathe007/Soil-Health-Analysis-Tool.git
cd soil-health-analysis
```

### 2. Setting Up the Backend (FastAPI)

#### Install Dependencies
```sh
cd fastapi-server
pip install -r requirements.txt
```

#### Run the FastAPI Server
```sh
uvicorn server:app --reload
```
FastAPI server will start at `http://127.0.0.1:8000`.

### 3. Setting Up the Frontend (React)

#### Install Dependencies
```sh
cd frontend
npm install
```

#### Run the React App
```sh
npm start
```
React frontend will start at `http://localhost:3000`.

## API Endpoints
- `GET /`: Health check
- `POST /predict`: Predicts soil health

## Technologies Used
- **Backend:** FastAPI, Python, scikit-learn
- **Frontend:** React, JavaScript

## Contributing
Feel free to contribute by submitting a pull request!

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.