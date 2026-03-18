from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import google.generativeai as genai
import os
import json
import re
from dotenv import load_dotenv

# ---------------- INIT ---------------- #

load_dotenv()

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# ---------------- PDF SKILL EXTRACTION ---------------- #

def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    text = extract_text_from_pdf(file)

    skills = []
    keywords = ["python", "java", "react", "node", "mongodb"]

    for word in keywords:
        if word in text.lower():
            skills.append(word)

    return jsonify({"skills": skills})


# ---------------- GENERATE QUIZ ---------------- #

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.json
    topic = data.get("topic")
    weak = data.get("weakAreas", "")
    difficulty = data.get("difficulty", "easy")

    try:
        model = genai.GenerativeModel("gemini-3-flash-preview")

        prompt = f"""
You are an expert technical interviewer.

Generate 5 {difficulty} level MCQ questions.

Topic: {topic}
Weak Areas: {weak}

Rules:
- Focus on weak areas
- Conceptual questions only
- Each question must have 4 options
- Only ONE correct answer

Return ONLY JSON:

[
  {{
    "question": "...",
    "options": ["A","B","C","D"],
    "answer": "...",
    "explanation": "..."
  }}
]
"""

        response = model.generate_content(prompt)
        text = response.text.strip()

        # Remove markdown if exists
        if "```" in text:
            text = re.sub(r"```json|```", "", text).strip()

        # Extract JSON safely
        match = re.search(r"\[.*\]", text, re.DOTALL)

        if not match:
            raise Exception("No JSON found")

        questions = json.loads(match.group(0))

        return jsonify({"questions": questions})

    except Exception as e:
        print("Gemini failed:", str(e))

        # Fallback
        return jsonify({
            "questions": [
                {
                    "question": f"What is {topic}?",
                    "options": [
                        f"{topic} concept",
                        "Incorrect option",
                        "Random guess",
                        "None of the above"
                    ],
                    "answer": f"{topic} concept",
                    "explanation": f"{topic} is a fundamental concept."
                },
                {
                    "question": f"Which is true about {topic}?",
                    "options": ["Statement A", "Statement B", "Statement C", "Statement D"],
                    "answer": "Statement A",
                    "explanation": "Statement A is correct."
                }
            ]
        })


# ---------------- SUBMIT QUIZ ---------------- #

@app.route('/submit-quiz', methods=['POST'])
def submit_quiz():
    data = request.json
    questions = data.get("questions", [])
    answers = data.get("answers", [])

    score = 0
    mistakes = []

    for i, q in enumerate(questions):
        correct = q.get("answer")
        user_ans = answers[i] if i < len(answers) else None

        if user_ans == correct:
            score += 1
        else:
            mistakes.append({
                "question": q.get("question"),
                "correct": correct,
                "user": user_ans,
                "explanation": q.get("explanation", f"Correct answer is {correct}")
            })

    # ---------------- ANALYSIS ---------------- #

    try:
        model = genai.GenerativeModel("gemini-3-flash-preview")

        prompt = f"""
You are an expert AI learning coach.

A student attempted a quiz and made these mistakes:

{mistakes}

Return STRICT JSON ONLY:

{{
  "weakAreas": ["short point"],
  "patterns": ["why mistakes happened"],
  "nextTopics": ["what to study next"],
  "suggestions": ["how to improve"]
}}

Rules:
- Only JSON
- No repetition
- Keep answers short and technical
"""

        response = model.generate_content(prompt)
        text = response.text.strip()

        # Remove markdown
        if "```" in text:
            text = re.sub(r"```json|```", "", text).strip()

        # Extract JSON safely
        match = re.search(r"\{.*\}", text, re.DOTALL)

        if not match:
            raise Exception("Invalid JSON")

        analysis = json.loads(match.group(0))

    except Exception as e:
        print("Analysis failed:", str(e))

        # Fallback
        analysis = {
            "weakAreas": ["Concept gaps"],
            "patterns": ["Conceptual misunderstanding"],
            "nextTopics": ["Revise fundamentals"],
            "suggestions": ["Practice more MCQs"]
        }

    return jsonify({
        "score": f"{score}/{len(questions)}",
        "mistakes": mistakes,
        "analysis": analysis
    })


# ---------------- RUN ---------------- #

if __name__ == '__main__':
    app.run(debug=True)