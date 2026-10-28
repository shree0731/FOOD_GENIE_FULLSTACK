import { useMemo, useState } from "react";
import { generateRecipeAPI } from "../api/recipeAPI";
import Loader from "./Loader";
import RecipeCard from "./RecipeCard";
import RecipeHistory from "./RecipeHistory";
import "./RecipeForm.css";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const chips = useMemo(
    () =>
      ingredients
        .split(",")
        .map((chip) => chip.trim())
        .filter(Boolean),
    [ingredients]
  );

  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Add at least one ingredient to get started.");
      return;
    }

    setError("");
    setLoading(true);
    setRecipe(null);

    try {
      const data = await generateRecipeAPI(ingredients);
      setRecipe(data.recipe);
      setHistory((prev) => [{ id: crypto.randomUUID(), ingredients, recipe: data.recipe }, ...prev].slice(0, 12));
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerateRecipe();
    }
  };

  const handleSelectHistory = (item) => {
    setRecipe(item.recipe);
    setError("");
  };

  return (
    <div className="kitchen">
      <div className="input-card">
        <textarea
          className="input-card__textarea"
          placeholder="e.g. chicken thighs, garlic, spinach, coconut milk"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          disabled={loading}
        />
        {ingredients.length > 0 && !loading && (
          <button type="button" className="input-card__clear" onClick={() => setIngredients("")} title="Clear text">
            ✕ Clear
          </button>
        )}

        {chips.length > 0 && (
          <div className="chip-row" aria-label="Parsed ingredients">
            {chips.map((chip, i) => (
              <span className="chip" key={`${chip}-${i}`}>
                {chip}
              </span>
            ))}
          </div>
        )}

        <div className="input-card__footer">
          <div className="input-card__hints">
            <span className="input-card__hint">Separate ingredients with commas</span>
            <span className="input-card__counter">{ingredients.length}/300</span>
          </div>
          <button className="cook-button" onClick={handleGenerateRecipe} disabled={loading}>
            {loading ? "Cooking…" : "Cook something up"}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner" role="alert">
          <span>⚠️</span> {error}
        </div>
      )}

      {loading && <Loader />}

      {!loading && recipe && <RecipeCard recipe={recipe} />}

      <RecipeHistory history={history} onSelect={handleSelectHistory} />
    </div>
  );
}
