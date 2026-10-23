export default function RecipeCard({ recipe }) {
  if (!recipe) return null;
  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <div className="recipe-card__meta">
        <span>⏱️ {recipe.prepTime} prep</span>
        <span>🔥 {recipe.cookTime} cook</span>
        <span>👥 {recipe.servings}</span>
        <span>📊 {recipe.difficulty}</span>
      </div>
      <h3>Ingredients</h3>
      <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
      <h3>Instructions</h3>
      <ol>{recipe.steps.map((st, i) => <li key={i}>{st}</li>)}</ol>
    </div>
  );
}
