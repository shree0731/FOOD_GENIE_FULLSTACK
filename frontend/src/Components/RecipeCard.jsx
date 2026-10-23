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
    </div>
  );
}
