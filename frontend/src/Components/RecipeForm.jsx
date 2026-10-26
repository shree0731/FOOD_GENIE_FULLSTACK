import { useState } from "react";
import "./RecipeForm.css";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  return (
    <div className="kitchen">
      <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
    </div>
  );
}
