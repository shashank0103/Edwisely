🚀 AI-Powered Adaptive Quiz System

An intelligent full-stack web application that generates personalized quizzes and provides AI-driven performance analysis using LLMs (Gemini API).

📌 Overview

This project is an Adaptive Learning System (ALS) designed to:

Identify a student’s weak areas

Generate targeted quiz questions

Analyze mistakes deeply

Provide actionable learning suggestions

Unlike traditional quiz apps, this system adapts dynamically based on user performance.

🧠 Key Features
✅ 1. AI-Based Quiz Generation

Generates MCQ questions using Gemini API

Focuses on:

Topic

Weak areas

Difficulty level

Ensures conceptual and tricky questions

✅ 2. Smart Performance Analysis

Evaluates user answers

Identifies:

Weak concepts

Mistake patterns

Learning gaps

Generates AI-powered feedback

✅ 3. Personalized Learning Suggestions

Suggests:

What to study next

How to improve

Targeted revision areas

✅ 4. Robust LLM Integration

Structured prompt engineering

JSON output enforcement

Regex-based parsing

Fallback logic if API fails

✅ 5. Full-Stack Implementation

Frontend: React

Backend: Flask

AI: Gemini API

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

Request:

{
  "topic": "Python OOP",
  "weakAreas": "inheritance, MRO",
  "difficulty": "medium"
}

Response:

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

Request:

{
  "questions": [...],
  "answers": [...]
}

Response:

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
🔹 1. Adaptive Learning Approach

Focuses more on weak topics

Reduces repetition of strong topics

Ensures balanced learning

🔹 2. Prompt Engineering

Used structured prompts to:

Force JSON output

Avoid hallucination

Ensure clarity and consistency

🔹 3. JSON Parsing Strategy

Handled unreliable LLM outputs using:

Markdown cleanup

Regex extraction

Error handling fallback

🔹 4. Fallback Mechanism

If Gemini fails:

Generates static questions

Provides basic feedback

👉 Ensures system never breaks

⚠️ Challenges Faced
❗ 1. LLM Output Inconsistency

Problem: Invalid JSON responses

Solution: Regex-based extraction + validation

❗ 2. API Failures

Problem: API key expiry / errors

Solution: Fallback question generator

❗ 3. Prompt Design

Problem: Generic responses

Solution: Iterative prompt engineering

🚀 Future Improvements

🔹 Add user authentication (JWT)

🔹 Store user progress in database

🔹 Implement adaptive scoring model

🔹 Use advanced NLP (BERT) for deeper analysis

🔹 Add leaderboard & gamification

🔹 Introduce spaced repetition learning

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
✔ Implements adaptive learning logic
✔ Handles real-world LLM limitations
✔ Focuses on user improvement, not just scoring

🧑‍💻 Author

Shashank Soma

⭐ Final Note

This project demonstra
