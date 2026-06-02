from flask import Blueprint, request, jsonify

from ai.recipe_agent import generate_recipe
from database.mongo import recipes

recipe_bp = Blueprint(
    "recipe",
    __name__
)

# Generate Recipe
@recipe_bp.route(
    "/generate-recipe",
    methods=["POST"]
)
def recipe():

    try:

        data = request.json

        ingredients = data.get("ingredients", [])
        cuisine = data.get("cuisine", "")
        diet = data.get("diet", "")

        recipe = generate_recipe(
            ingredients,
            cuisine,
            diet
        )

        return jsonify(recipe)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# Save Recipe
@recipe_bp.route(
    "/save-recipe",
    methods=["POST"]
)
def save_recipe():

    try:

        data = request.json

        result = recipes.insert_one(data)

        return jsonify({
            "message": "Recipe saved",
            "id": str(result.inserted_id)
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# Get Recipe History
@recipe_bp.route(
    "/recipes",
    methods=["GET"]
)
def get_recipes():

    try:

        all_recipes = []

        for recipe in recipes.find():

            recipe["_id"] = str(
                recipe["_id"]
            )

            all_recipes.append(
                recipe
            )

        return jsonify(
            all_recipes
        )

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500