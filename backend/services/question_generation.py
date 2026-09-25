from dotenv import load_dotenv
from openai import OpenAI
import random

load_dotenv(override=True)

client = OpenAI()

topics = [
    "sensor data",
    "customer churn",
    "fraud detection",
    "healthcare analytics",
    "time series forecasting",
    "anomaly detection",
    "recommendation systems",
    "natural language processing",
    "computer vision",
    "A/B testing",
]

system_message = '''You are an AI interview question generator. Generate a precise case-based interview questions, that seek an candidate's conceptual clarity.
Do not make the question very long. Keep it as - You find yourself in such a situation or you are tasked to initiate something - how would you tackle it - kind of question.

INSTRUCTIONS:
- Push a person to think about one or two things.
- Do not include several questions within one question.
- Make it interesting.
- Take a story telling approach.
- Include varieties: Sensor data, customer churn, fraud prediction, healthcare problems, etc.

'''

user_message = '''Generate one interview question about a {topic}.'''

def generate_question(topic=None):

    if topic is None:
        topic = random.choice(topics)

    messages = [
        {
            "role": "system",
            "content": system_message
        },
        {
            "role": "user",
            "content": user_message.format(topic=topic)
        }
    ]

    response = client.responses.create(
        model="gpt-5-mini",
        input=messages
    )

    return response.output_text



if __name__ == "__main__":
    print(generate_question("machine learning"))