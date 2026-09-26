import { useState } from "react"

function App() {
  const [topic, setTopic] = useState("")

  return (
    <div>
      <h1>AI Interviewer</h1>

      <p>Practice your Data Science interview skills.</p>

      <input
        type="text"
        placeholder="Enter a topic (optional)"
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
      />

      <button onClick={() => alert(topic || "Random topic")}>
        Generate Question
      </button>
    </div>
  )
}

export default App