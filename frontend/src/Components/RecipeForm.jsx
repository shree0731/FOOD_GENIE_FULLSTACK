import { useState, useMemo } from "react";
import "./RecipeForm.css";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const chips = useMemo(() => ingredients.split(",").map(c => c.trim()).filter(Boolean), [ingredients]);
  return (
    <div className="kitchen">
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
      <div>{chips.map((c, i) => <span key={i}>{c}</span>)}</div>
    </div>
  );
}
