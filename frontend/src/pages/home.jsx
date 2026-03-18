import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [topic, setTopic] = useState("");
  const [weakAreas, setWeakAreas] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const navigate = useNavigate();

  const generateQuiz = async () => {
    try {
      const res = await axios.post("https://edwisely-9u5d.onrender.com/generate-quiz", {
        topic,
        weakAreas,
        difficulty,
      });

      navigate("/quiz", { state: { questions: res.data.questions } });
    } catch (err) {
      alert("Error generating quiz");
    }
  };

  return (
    <div className="container">
      <h1>AI Personalized Quiz</h1>

      <div className="card">
        <label>Topic</label>
        <input
          placeholder="e.g. Python OOP"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <label>Weak Areas</label>
        <textarea
          placeholder="e.g. inheritance, decorators"
          value={weakAreas}
          onChange={(e) => setWeakAreas(e.target.value)}
        />

        <label>Difficulty</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <div className="center">
          <button onClick={generateQuiz}>Generate Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
