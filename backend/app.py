from fastapi import FastAPI

from backend.services.question_generation import generate_question


app = FastAPI()


@app.get("/question")
def get_question():
    question = generate_question()
    return {"question": question}