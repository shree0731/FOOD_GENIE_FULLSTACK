import "./RecipeHistory.css";

export default function RecipeHistory({ history, onSelect }) {
  if (history.length === 0) return null;

  return (
    <div className="recipe-box">
      <h3 className="recipe-box__heading">
        <span>📇</span> Recipe box
      </h3>
      <div className="recipe-box__scroller">
        {history.map((item) => (
          <button
            key={item.id}
            className="recipe-box__card"
            onClick={() => onSelect(item)}
            title={`Reopen "${item.recipe.title}"`}
          >
            <span className="recipe-box__card-title">{item.recipe.title}</span>
            <span className="recipe-box__card-ingredients">{item.ingredients}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
