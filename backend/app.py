from fastapi import FastAPI

from backend.services.question_generation import generate_question


app = FastAPI()


@app.get("/question")
def get_question(topic: str):
    question = generate_question(topic)
    return {"question": question}