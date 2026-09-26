from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.services.question_generation import generate_question

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://interview-app-phty.onrender.com/",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/question")
def get_question(topic: str | None = None):
    question = generate_question(topic)
    return {"question": question}