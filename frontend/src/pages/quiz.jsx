import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  let questions = location.state?.questions || [];

  if (typeof questions === "string") {
    try {
      questions = JSON.parse(questions);
    } catch (e) {
      questions = [];
    }
  }

  if (!Array.isArray(questions)) {
    questions = [];
  }

  const [answers, setAnswers] = useState([]);

  const handleAnswer = (index, option) => {
    const updated = [...answers];
    updated[index] = option;
    setAnswers(updated);
  };

  const submitQuiz = async () => {
    try {
      const res = await axios.post("https://edwisely-9u5d.onrender.com/submit-quiz", {
        questions,
        answers,
      });

      navigate("/result", { state: { result: res.data } });
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz");
    }
  };

  return (
    <div className="container">
      <h1>Quiz</h1>

      {questions.length === 0 ? (
        <p>No questions found ⚠️</p>
      ) : (
        questions.map((q, i) => (
          <div key={i} className="question">
            <p><b>{i + 1}. {q.question}</b></p>

            {Array.isArray(q.options) ? (
              q.options.map((opt, j) => (
               <button
  key={j}
  className={`option-btn ${answers[i] === opt ? "selected" : ""}`}
  onClick={() => handleAnswer(i, opt)}
>
  {opt}
</button>
              ))
            ) : (
              <p>No options available</p>
            )}
          </div>
        ))
      )}

      {questions.length > 0 && (
        <button onClick={submitQuiz}>Submit Quiz</button>
      )}
    </div>
  );
}

export default Quiz;
