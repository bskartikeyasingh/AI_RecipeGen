function RecipeCard({ recipe }) {

  return (
    <div className="bg-gray-900 p-6 rounded-2xl">

      <h2 className="text-3xl font-bold">
        {recipe.dish}
      </h2>

      <p className="mt-2">
        {recipe.description}
      </p>

      <p className="mt-2">
        ⏱ {recipe.cook_time}
      </p>

    </div>
  );
}

export default RecipeCard;