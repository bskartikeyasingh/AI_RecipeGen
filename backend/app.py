from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv

from database import (
    recipes_collection,
    favorites_collection
)

import requests
import os
import json
import datetime

# ====================================
# LOAD ENV
# ====================================

load_dotenv()

# ====================================
# APP
# ====================================


app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "*"}}
)


    

@app.after_request
def after_request(response):

    response.headers["Access-Control-Allow-Origin"] = "*"

    response.headers["Access-Control-Allow-Headers"] = (
        "Content-Type,Authorization"
    )

    response.headers["Access-Control-Allow-Methods"] = (
        "GET,POST,PUT,DELETE,OPTIONS"
    )

    return response

# ====================================
# FOLDERS
# ====================================

MEDIA_FOLDER = "media"

IMAGE_FOLDER = os.path.join(
    MEDIA_FOLDER,
    "images"
)

os.makedirs(
    IMAGE_FOLDER,
    exist_ok=True
)

# ====================================
# API KEYS
# ====================================

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)

CLIPDROP_API_KEY = os.getenv(
    "CLIPDROP_API_KEY"
)
BASE_URL = os.getenv(
    "BASE_URL"
)
# ====================================
# GROQ
# ====================================

groq_client = Groq(
    api_key=GROQ_API_KEY
)

# ====================================
# IMAGE ROUTE
# ====================================

@app.route('/media/images/<filename>')
def serve_image(filename):

    return send_from_directory(
        IMAGE_FOLDER,
        filename
    )

# ====================================
# GENERATE IMAGE
# ====================================

def generate_ai_image(

    image_prompt,

    step_number
):

    try:

        response = requests.post(

            "https://clipdrop-api.co/text-to-image/v1",

            files={
                'prompt':
                (None, image_prompt)
            },

            headers={
                'x-api-key':
                CLIPDROP_API_KEY
            }
        )

        if response.status_code != 200:

            print(
                "CLIPDROP ERROR:",
                response.text
            )

            return (
                "https://images.unsplash.com/"
                "photo-1546069901-ba9599a7e63c"
            )

        image_filename = (
            f"step_{step_number}.png"
        )

        image_path = os.path.join(
            IMAGE_FOLDER,
            image_filename
        )

        with open(
            image_path,
            "wb"
        ) as f:

            f.write(response.content)

        return (
    f"{BASE_URL}/media/images/{image_filename}"
)
    except Exception as e:

        print(
            "IMAGE ERROR:",
            str(e)
        )

        return (
            "https://images.unsplash.com/"
            "photo-1546069901-ba9599a7e63c"
        )

# ====================================
# HOME
# ====================================

@app.route("/")
def home():

    return "Backend Running"

# ====================================
# GENERATE RECIPE
# ====================================

@app.route(
    "/generate-recipe",
    methods=["POST", "OPTIONS"]
)

def generate_recipe():

    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    try:

        data = request.json

        ingredients = data.get(
            "ingredients",
            []
        )

        cuisine = data.get(
            "cuisine",
            "Indian"
        )

        diet = data.get(
            "diet",
            "Vegetarian"
        )

        user_email = data.get(
            "user_email",
            "guest"
        )

        ingredients_text = ", ".join(
            ingredients
        )

        prompt = f"""
        Generate a professional recipe.

        Cuisine:
        {cuisine}

        Diet:
        {diet}

        Ingredients:
        {ingredients_text}

        RETURN STRICT JSON ONLY.

        FORMAT:

        {{
          "dish": "",
          "description": "",
          "cook_time": "",
          "steps": [
            {{
              "step": 1,
              "instruction": "",
              "image_prompt": ""
            }}
          ]
        }}

        RULES:

        1. Generate EXACTLY 5 steps.

        2. image_prompt should describe:
           - chef action
           - cooking process
           - realistic kitchen
           - food photography
        """

        response = (
            groq_client.chat.completions.create(

                model="llama-3.3-70b-versatile",

                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],

                temperature=1
            )
        )

        recipe_content = (
            response
            .choices[0]
            .message
            .content
        )

        recipe_content = (
            recipe_content
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        recipe_data = json.loads(
            recipe_content
        )

        for step in recipe_data["steps"]:

            image_url = generate_ai_image(

                step["image_prompt"],

                step["step"]
            )

            step["image"] = image_url

        recipe_document = {

            "user_email":
            user_email,

            "dish":
            recipe_data["dish"],

            "description":
            recipe_data["description"],

            "cook_time":
            recipe_data["cook_time"],

            "steps":
            recipe_data["steps"],

            "created_at":
            datetime.datetime.utcnow()
        }

        recipes_collection.insert_one(
            recipe_document
        )

        return jsonify(
            recipe_data
        )

    except Exception as e:

        print(
            "ERROR:",
            str(e)
        )

        return jsonify({
            "error": str(e)
        }), 500

# ====================================
# GET HISTORY
# ====================================

@app.route(
    "/history/<email>",
    methods=["GET"]
)

def get_history(email):

    try:

        recipes = list(

            recipes_collection.find(

                {
                    "user_email": email
                },

                {
                    "_id": 0
                }
            ).sort(
                "created_at",
                -1
            )
        )

        return jsonify(recipes)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# ====================================
# SAVE FAVORITE
# ====================================

@app.route(
    "/save-favorite",
    methods=["POST"]
)

def save_favorite():

    try:

        data = request.json

        favorites_collection.insert_one(
            data
        )

        return jsonify({
            "message":
            "Favorite saved"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# ====================================
# GET FAVORITES
# ====================================

@app.route(
    "/favorites/<email>",
    methods=["GET"]
)

def get_favorites(email):

    try:

        favorites = list(

            favorites_collection.find(

                {
                    "user_email": email
                },

                {
                    "_id": 0
                }
            )
        )

        return jsonify(favorites)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# ====================================
# MAIN
# ====================================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )
