import { useState } from "react";
import "./App.css";

function App() {
  const [gameId, setGameId] = useState("");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");

  const startGame = async () => {
    try {
      const res = await fetch(
        "https://guessgame-backend-1.onrender.com/game/start"
      );
      const id = await res.text();
      setGameId(id);
      setResult("Game Started! 🎯");
    } catch (error) {
      setResult("Error starting game ❌");
    }
  };

  const sendGuess = async () => {
    try {
      const res = await fetch(
        `https://guessgame-backend-1.onrender.com/game/guess?gameId=${gameId}&guess=${guess}`
      );
      const data = await res.text();
      setResult(data);
    } catch (error) {
      setResult("Error sending guess ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎯 Guess The Number</h1>

        <button style={styles.startBtn} onClick={startGame}>
          Start Game
        </button>

        <input
          style={styles.input}
          type="number"
          placeholder="Enter your guess..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />

        <button style={styles.guessBtn} onClick={sendGuess}>
          Submit Guess
        </button>

        <h2 style={styles.result}>{result}</h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e2f, #3a0ca3)",
    fontFamily: "Arial",
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
    width: "320px",
  },
  title: {
    marginBottom: "20px",
    color: "#3a0ca3",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "15px 0",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  startBtn: {
    background: "#7209b7",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  guessBtn: {
    background: "#f72585",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    color: "#333",
  },
};

export default App;