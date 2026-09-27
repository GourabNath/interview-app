import { useEffect, useState } from "react"
import "./App.css"

const brewingMessages = [
  "Warming up the kettle...",
  "Picking the right beans...",
  "Finding something worth thinking about...",
  "Adding a little Data Science...",
  "Brewing your question..."
]

function App() {
  const [topic, setTopic] = useState("")
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [brewingMessage, setBrewingMessage] = useState("")

  // Rotate the brewing messages while the API request is running.
  useEffect(() => {
    if (!loading) {
      setBrewingMessage("")
      return
    }

    let messageIndex = 0

    setBrewingMessage(brewingMessages[messageIndex])

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % brewingMessages.length
      setBrewingMessage(brewingMessages[messageIndex])
    }, 700)

    return () => clearInterval(interval)
  }, [loading])

  // React → FastAPI → OpenAI
  async function generateQuestion() {
    setLoading(true)
    setError("")
    setQuestion("")

    try {
      const url = topic.trim()
        ? `https://ai-interviewer-backend-ep70.onrender.com/question?topic=${encodeURIComponent(topic)}`
        : "https://ai-interviewer-backend-ep70.onrender.com/question"

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

        {/* BRAND */}
        <header className="hero">
          <div className="logo">DB</div>

          <div>
            <h1>Data Brew</h1>
            <p>Start your day with a cup of Data Science.</p>
          </div>
        </header>

        {/* QUESTION GENERATOR */}
        <section className="generator-card">

          <label htmlFor="topic">
            What do you want to think about?
          </label>

          <div className="input-row">
            <input
              id="topic"
              type="text"
              placeholder="e.g. machine learning, fraud detection..."
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !loading) {
                  generateQuestion()
                }
              }}
            />

            <button
              onClick={generateQuestion}
              disabled={loading}
            >
              {loading ? "Brewing..." : "Brew a Question"}
            </button>
          </div>

          <p className="hint">
            Leave it blank and we'll choose a Data Science topic for you.
          </p>
        </section>

        {/* BREWING STATE */}
        {loading && (
          <section className="brewing-state">
            <div className="brewing-line"></div>
            <p>{brewingMessage}</p>
          </section>
        )}

        {/* ERROR */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* QUESTION */}
        {question && !loading && (
          <section className="question-card">

            <div className="question-label">
              TODAY'S DATA CHALLENGE
            </div>

            <p className="question">
              {question}
            </p>

            <div className="question-footer">
              Take your time. Think before you answer.
            </div>

          </section>
        )}

        {/* INITIAL STATE */}
        {!question && !loading && !error && (
          <section className="empty-state">
            <div className="empty-icon">?</div>

            <h2>Your next challenge is waiting.</h2>

            <p>
              Choose a topic or let Data Brew surprise you.
            </p>
          </section>
        )}

      </main>
    </div>
  )
}

export default App