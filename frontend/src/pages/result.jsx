import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) return <h2 className="center">No result found</h2>;

  const analysis = result.analysis || {};

  return (
    <div className="container">
      <h1>Quiz Result</h1>

      {/* Score */}
      <div className="card score">
        <h2>Score: {result.score}</h2>
      </div>

      {/* Mistakes */}
      <h2>Mistakes Analysis</h2>

      {result.mistakes?.length > 0 ? (
        result.mistakes.map((m, i) => (
          <div key={i} className="card mistake">
            <p><b>Q{i + 1}:</b> {m.question}</p>

            <p style={{ color: "red" }}>
              <b>Your Answer:</b> {m.user || "Not Answered"}
            </p>

            <p style={{ color: "green" }}>
              <b>Correct Answer:</b> {m.correct}
            </p>

            <p><b>Explanation:</b> {m.explanation}</p>
          </div>
        ))
      ) : (
        <p style={{ color: "green" }}>No mistakes 🎉 Excellent work!</p>
      )}

      {/* 🔥 AI ANALYSIS */}
      <h2>Performance Insights</h2>

      <div className="card insight">

        <h3>Weak Areas</h3>
        <ul>
          {analysis.weakAreas?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>Patterns</h3>
        <ul>
          {analysis.patterns?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>Next Topics</h3>
        <ul>
          {analysis.nextTopics?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>Suggestions</h3>
        <ul>
          {analysis.suggestions?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

      </div>

      <div className="center">
        <button onClick={() => navigate("/")}>
          Try Another Quiz
        </button>
      </div>
    </div>
  );
}

export default Result;