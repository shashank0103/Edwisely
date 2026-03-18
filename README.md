.

🚀 AI-Powered Adaptive Quiz System

An intelligent full-stack web application that generates personalized quizzes and provides AI-driven performance analysis using LLMs (Gemini API).

📌 Overview

This project implements an Adaptive Learning System (ALS) that dynamically adjusts to a student’s performance.

Unlike traditional quiz apps, this system:

Identifies weak areas

Generates targeted questions

Analyzes mistakes deeply

Provides actionable learning suggestions

🧠 Key Features
✅ 1. AI-Based Quiz Generation

Generates MCQs using Gemini API

Customizes questions based on:

Topic

Weak areas

Difficulty level

Focuses on conceptual and edge-case questions

✅ 2. Smart Performance Analysis

Evaluates user responses

Identifies:

Weak concepts

Mistake patterns

Learning gaps

Produces structured AI feedback

✅ 3. Personalized Learning Suggestions

Recommends:

What to study next

How to improve

Targeted revision areas

✅ 4. Robust LLM Integration

Structured prompt engineering

Enforced JSON output format

Regex-based response parsing

Fallback handling for API failures

✅ 5. Full-Stack Implementation

Frontend: React.js

Backend: Flask (Python)

AI Integration: Gemini API

🏗️ System Architecture
Frontend (React)
        ↓
Backend API (Flask)
        ↓
----------------------------------
|  Quiz Generator (LLM)          |
|  Performance Analyzer (LLM)    |
|  Weakness Detection Engine     |
----------------------------------
        ↓
User Data (In-Memory / DB)
⚙️ Tech Stack
Layer	Technology
Frontend	React.js
Backend	Flask (Python)
AI/ML	Gemini API
Parsing	Regex + JSON
Deployment	Render + Vercel
🔌 API Endpoints
📥 Generate Quiz

POST /generate-quiz

Request
{
  "topic": "Python OOP",
  "weakAreas": "inheritance, MRO",
  "difficulty": "medium"
}
Response
{
  "questions": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "...",
      "explanation": "..."
    }
  ]
}
📤 Submit Quiz

POST /submit-quiz

Request
{
  "questions": [...],
  "answers": [...]
}
Response
{
  "score": "3/5",
  "mistakes": [...],
  "analysis": {
    "weakAreas": [...],
    "patterns": [...],
    "nextTopics": [...],
    "suggestions": [...]
  }
}
🧠 Core Logic
🔹 Adaptive Learning Strategy

Prioritizes weak topics

Reduces repetition of strong areas

Maintains balanced difficulty progression

🔹 Prompt Engineering

Designed structured prompts to:

Enforce JSON output

Reduce hallucinations

Improve consistency

🔹 JSON Parsing Strategy

Handles unreliable LLM outputs using:

Regex-based extraction

Format validation

Error handling with retries

🔹 Fallback Mechanism

If Gemini API fails:

Generates fallback questions

Provides basic feedback

👉 Ensures system reliability and uptime

⚠️ Challenges & Solutions
❗ LLM Output Inconsistency

Problem: Invalid or malformed JSON
Solution: Regex extraction + validation + retry logic

❗ API Failures

Problem: API downtime / key issues
Solution: Fallback quiz generator

❗ Prompt Design

Problem: Generic or low-quality outputs
Solution: Iterative prompt engineering with constraints

🚀 Future Improvements

🔐 User authentication (JWT)

🗄️ Persistent database for user progress

📊 Advanced adaptive scoring models

🧠 NLP models (e.g., BERT) for deeper analysis

🏆 Leaderboard & gamification

🔁 Spaced repetition learning

🧪 How to Run Locally
🔹 Backend
pip install -r requirements.txt
python app.py

Create .env file:

GEMINI_API_KEY=your_api_key_here
🔹 Frontend
npm install
npm start
🌐 Deployment

Backend: Render

Frontend: Vercel

💡 What Makes This Project Unique?

✔ Combines AI + Backend + Product Thinking
✔ Implements real adaptive learning logic
✔ Handles real-world LLM limitations
✔ Focuses on learning improvement, not just scoring

🧑‍💻 Author

Shashank Soma

⭐ Final Note

This project demonstrates how Large Language Models can be integrated into real-world systems to build intelligent, adaptive, and user-centric learning applications.
