# 🧠 Lumipsyche — AI-Powered Mental Health Assistant

> *Understanding emotions through AI to enable early mental health intervention.*

---

## 🚀 Overview

**Lumipsyche** is an AI-driven mental health analysis system that detects **anxiety and depression patterns** from textual data using advanced **Natural Language Processing (NLP)**.

It provides **real-time emotional insights**, helping in **early detection and awareness of mental health conditions**.

---

## 🎯 Key Features

- ✨ Emotion & Sentiment Detection  
- 🧠 Anxiety & Depression Classification  
- ⚡ Real-time Text Analysis  
- 🔗 REST API (FastAPI)  
- 💻 Interactive Frontend (React)  
- 📈 Scalable Architecture  

---

## 🧠 Tech Stack

### 🔹 AI / ML
- Python  
- Scikit-learn / TensorFlow  
- NLP (TF-IDF, BERT)  
- Sentiment Analysis  

### 🔹 Backend
- FastAPI  
- Uvicorn  
- REST APIs  

### 🔹 Frontend
- React.js  
- HTML, CSS, JavaScript  

### 🔹 Tools
- Jupyter Notebook  
- Git & GitHub  

---

## 🏗️ Project Structure


lumipsyche/
│
├── backend/
│ ├── model/
│ ├── api/
│ ├── utils/
│ └── main.py
│
├── frontend/
│ ├── src/
│ └── components/
│
├── data/
├── notebooks/
└── README.md


---

## ⚙️ How It Works

1. User inputs text  
2. Text preprocessing (cleaning, tokenization)  
3. Feature extraction (TF-IDF / BERT)  
4. Model predicts mental state:
   - Anxiety  
   - Depression  
   - Neutral  
5. Results returned via API & displayed on UI  

---

## 📊 Model Performance

- 🎯 Accuracy: **~85%**
- 📈 Techniques Used:
  - Class imbalance handling  
  - Feature engineering  
  - Hyperparameter tuning  

---

## 🖥️ Installation & Setup

### 🔹 Clone Repository

```bash
git clone https://github.com/your-username/lumipsyche.git
cd lumipsyche
🔹 Backend Setup (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend will run on:
👉 http://127.0.0.1:8000

Swagger Docs:
👉 http://127.0.0.1:8000/docs

🔹 Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev

Frontend will run on:
👉 http://localhost:5173

📌 API Example
Endpoint:
POST /predict
Request:
{
  "text": "I feel anxious and stressed all the time"
}
Response:
{
  "prediction": "Anxiety",
  "confidence": 0.87
}
💡 Use Cases
🧑‍⚕️ Mental Health Platforms
🤖 AI Chatbots / Therapists
🏫 Research & Academia
📊 Social Media Sentiment Analysis
🔐 Future Enhancements
🔹 Real-time AI Therapist Chat
🔹 Voice Emotion Detection
🔹 Personalized Recommendations
🔹 Email/SMS Alerts
🔹 User Authentication System
🏆 Achievements
✅ Built end-to-end NLP pipeline
✅ Integrated FastAPI with ML model
✅ Developed real-time prediction system
✅ Solved real-world mental health problem
👩‍💻 Author

Ojasvee Gupta
📧 ojasveegupta10@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/ojasvee-gupta-830952255/

⭐ Support

If you found this project useful:

⭐ Star the repository
🔁 Share with others
💡 Contribute improvements
⚠️ Disclaimer

This project is for educational and research purposes only.
It is not a substitute for professional medical advice.

🔥 Tagline

AI that listens, understands, and supports mental well-being.
