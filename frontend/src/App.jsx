import { useState } from "react"
import "./App.css"

function App() {
  const [topic, setTopic] = useState("")
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // API layer: React → FastAPI → OpenAI
  async function generateQuestion() {
    setLoading(true)
    setError("")
    setQuestion("")

    try {
      const url = topic.trim()
        ? `http://127.0.0.1:8000/question?topic=${encodeURIComponent(topic)}`
        : "http://127.0.0.1:8000/question"

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Unable to generate a question.")
      }

      const data = await response.json()

      setQuestion(data.question)
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <main className="container">

        {/* BRAND / HEADER */}
        <header className="hero">
          <div className="logo">AI</div>

          <div>
            <h1>AI Interviewer</h1>
            <p>Sharpen your Data Science interview skills.</p>
          </div>
        </header>

        {/* INPUT SECTION */}
        <section className="generator-card">

          <label htmlFor="topic">
            What do you want to practice?
          </label>

          <div className="input-row">
            <input
              id="topic"
              type="text"
              placeholder="e.g. machine learning, fraud detection..."
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  generateQuestion()
                }
              }}
            />

            <button
              onClick={generateQuestion}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          <p className="hint">
            Leave it blank and we'll choose a random Data Science topic.
          </p>
        </section>

        {/* ERROR STATE */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* QUESTION OUTPUT */}
        {question && (
          <section className="question-card">

            <div className="question-label">
              INTERVIEW QUESTION
            </div>

            <p className="question">
              {question}
            </p>

            <div className="question-footer">
              <span>Take your time. Think before you answer.</span>
            </div>

          </section>
        )}

        {/* EMPTY STATE */}
        {!question && !loading && !error && (
          <section className="empty-state">
            <div className="empty-icon">?</div>
            <h2>Your next question is waiting.</h2>
            <p>
              Choose a topic or let AI surprise you.
            </p>
          </section>
        )}

      </main>
    </div>
  )
}

export default App