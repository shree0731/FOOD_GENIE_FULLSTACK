const SYSTEM_PROMPT = `You are a professional recipe developer. Given a list of ingredients someone has on hand, create ONE clear, cookable recipe.

Rules:
- Prefer the listed ingredients, but you may assume basic pantry staples (salt, pepper, oil, water) are available.
- Keep instructions concrete and short: one action per step.
- Respond with ONLY valid json (no markdown fences, no commentary) matching exactly this shape:

{
  "title": "string, short and appetizing",
  "description": "string, one enticing sentence",
  "prepTime": "string, e.g. '10 mins'",
  "cookTime": "string, e.g. '20 mins'",
  "servings": "string, e.g. '2 servings'",
  "difficulty": "Easy" | "Medium" | "Hard",
  "ingredients": ["string, each formatted as 'amount + item', e.g. '2 cups rice'"],
  "steps": ["string, one instruction per step, no numbering prefix"],
  "tip": "string, one short helpful tip or substitution idea"
}`;

const MAX_INGREDIENTS_LENGTH = 300;

export const generateRecipe = async (req, res) => {
  const { ingredients } = req.body ?? {};

  if (typeof ingredients !== "string" || !ingredients.trim()) {
    return res.status(400).json({ error: "Please enter at least one ingredient." });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      error: "Server is missing GROQ_API_KEY. Add it to backend/.env and restart the server.",
    });
  }

  res.json({ status: "ready" });
};
