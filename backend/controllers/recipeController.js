export const generateRecipe = async (req, res) => {
  const { ingredients } = req.body ?? {};

  if (typeof ingredients !== "string" || !ingredients.trim()) {
    return res.status(400).json({ error: "Please enter at least one ingredient." });
  }

  res.json({ status: "valid input" });
};
