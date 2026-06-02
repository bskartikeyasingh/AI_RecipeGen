import os
import requests
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")

API_URL = (
    "https://api-inference.huggingface.co/models/"
    "stabilityai/stable-diffusion-xl-base-1.0"
)

headers = {
    "Authorization": f"Bearer {HF_API_KEY}"
}


def generate_step_image(prompt):

    try:

        response = requests.post(
            API_URL,
            headers=headers,
            json={
                "inputs": prompt
            },
            timeout=120
        )

        if response.status_code != 200:

            print(
                "HF ERROR:",
                response.text
            )

            return (
                "https://placehold.co/800x500/png"
                "?text=Image+Failed"
            )

        filename = (
            f"media/images/"
            f"{abs(hash(prompt))}.png"
        )

        with open(
            filename,
            "wb"
        ) as file:

            file.write(
                response.content
            )

        return (
            "http://127.0.0.1:5000/"
            + filename
        )

    except Exception as e:

        print(e)

        return (
            "https://placehold.co/800x500/png"
            "?text=Image+Error"
        )