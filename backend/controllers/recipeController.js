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

  const cleanIngredients = ingredients.trim().slice(0, MAX_INGREDIENTS_LENGTH);
  res.json({ cleanIngredients });
};
