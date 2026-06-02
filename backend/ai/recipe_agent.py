import json

from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

from ai.image_generator import generate_step_image
from ai.prompts import RECIPE_PROMPT

load_dotenv()

llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0.7
)

prompt = PromptTemplate(
    input_variables=[
        "ingredients",
        "cuisine",
        "diet"
    ],
    template=RECIPE_PROMPT
)

chain = prompt | llm


def generate_recipe(
    ingredients,
    cuisine,
    diet
):

    response = chain.invoke(
        {
            "ingredients": ", ".join(ingredients),
            "cuisine": cuisine,
            "diet": diet
        }
    )

    content = response.content

    content = (
        content
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:

        recipe_data = json.loads(
            content
        )

        if "steps" in recipe_data:

            for step in recipe_data["steps"]:

                image_url = generate_step_image(
                    step.get(
                        "image_prompt",
                        "recipe cooking step"
                    )
                )

                step["image_url"] = image_url

        return recipe_data

    except Exception as e:

        return {
            "error": str(e),
            "raw_response": content
        }