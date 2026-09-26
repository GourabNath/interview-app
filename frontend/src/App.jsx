import { useState } from "react"

function App() {
  // FRONTEND STATE:
  // topic = what the user enters
  // question = what the backend returns
  const [topic, setTopic] = useState("")
  const [question, setQuestion] = useState("")

  // API COMMUNICATION:
  // React calls our FastAPI backend.
  // The OpenAI API key never comes into the browser.
  async function generateQuestion() {
    const url = topic
      ? `http://127.0.0.1:8000/question?topic=${encodeURIComponent(topic)}`
      : "http://127.0.0.1:8000/question"

    const response = await fetch(url)

    // Convert the backend JSON response into a JavaScript object.
    const data = await response.json()

    // Store the backend result in React state.
    setQuestion(data.question)
  }

  return (
    <div>
      <h1>AI Interviewer</h1>

      <p>Practice your Data Science interview skills.</p>

      {/* USER INPUT */}
      <input
        type="text"
        placeholder="Enter a topic (optional)"
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
      />

      {/* USER ACTION → API CALL */}
      <button onClick={generateQuestion}>
        Generate Question
      </button>

      {/* BACKEND RESPONSE → UI */}
      {question && (
        <div>
          <h2>Interview Question</h2>
          <p>{question}</p>
        </div>
      )}
    </div>
  )
}

export default App