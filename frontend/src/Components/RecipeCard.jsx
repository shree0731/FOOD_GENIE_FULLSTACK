export default function RecipeCard({ recipe }) {
  if (!recipe) return null;
  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
    </div>
  );
}
