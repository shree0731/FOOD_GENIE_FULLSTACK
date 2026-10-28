import "./RecipeCard.css";

const DIFFICULTY_ICON = {
  Easy: "●",
  Medium: "●●",
  Hard: "●●●",
};

import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const [copied, setCopied] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopy = () => {
    if (!recipe) return;
    const text = `${recipe.title}\n\n${recipe.description}\n\nIngredients:\n${recipe.ingredients.join("\n")}\n\nSteps:\n${recipe.steps.join("\n")}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const { title, description, prepTime, cookTime, servings, difficulty, ingredients, steps, tip } = recipe;

  return (
    <div className="recipe-card">
      <div className="recipe-card__pin" aria-hidden="true" />

      <h2 className="recipe-card__title">{title}</h2>
      {description && <p className="recipe-card__description">{description}</p>}

      <div className="recipe-card__meta">
        {prepTime && (
          <div className="meta-badge">
            <span className="meta-badge__label">Prep</span>
            <span className="meta-badge__value">{prepTime}</span>
          </div>
        )}
        {cookTime && (
          <div className="meta-badge">
            <span className="meta-badge__label">Cook</span>
            <span className="meta-badge__value">{cookTime}</span>
          </div>
        )}
        {servings && (
          <div className="meta-badge">
            <span className="meta-badge__label">Serves</span>
            <span className="meta-badge__value">{servings}</span>
          </div>
        )}
        {difficulty && (
          <div className="meta-badge">
            <span className="meta-badge__label">Difficulty</span>
            <span className="meta-badge__value meta-badge__value--dots">
              {DIFFICULTY_ICON[difficulty] || difficulty}
            </span>
          </div>
        )}
      </div>

      <div className="recipe-card__divider" />

      <section className="recipe-card__section">
        <h3 className="recipe-card__heading">Ingredients</h3>
        <ul className="ingredient-list">
          {ingredients.map((item, i) => (
            <li key={i} className="ingredient-list__item">
              <span className="ingredient-list__check" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="recipe-card__section">
        <h3 className="recipe-card__heading">Method</h3>
        <ol className="step-list">
          {steps.map((step, i) => (
            <li key={i} className="step-list__item">
              <span className="step-list__number">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {tip && (
        <div className="recipe-card__tip">
          <span className="recipe-card__tip-icon" aria-hidden="true">💡</span>
          <p>{tip}</p>
        </div>
      )}
    </div>
  );
}
