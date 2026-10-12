function extractJson(raw) {
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object found in AI response");
  return JSON.parse(cleaned.slice(start, end + 1));
}

function validateRecipeShape(recipe) {
  const requiredStringFields = ["title", "description", "prepTime", "cookTime", "servings", "difficulty"];
  for (const field of requiredStringFields) {
    if (typeof recipe[field] !== "string" || !recipe[field].trim()) {
      throw new Error(`Recipe is missing a valid "${field}"`);
    }
  }
  if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
    throw new Error('Recipe is missing "ingredients"');
  }
  if (!Array.isArray(recipe.steps) || recipe.steps.length === 0) {
    throw new Error('Recipe is missing "steps"');
  }
  return true;
}

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("TIMEOUT")), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export const generateRecipe = async (req, res) => {
  res.json({ status: "ready" });
};
