import Groq from "groq-sdk";

// Groq client is created lazily inside generateRecipe (not at module load
// time) because dotenv.config() in server.js runs after ES module imports
// are resolved — instantiating this at the top would read an empty API key.

// Keep responses fast by capping generation length and hard-timing-out
// the request instead of letting a slow model call hang the client.
const MODEL = "llama-3.1-8b-instant";
const MAX_TOKENS = 900;
const REQUEST_TIMEOUT_MS = 15000;
const MAX_INGREDIENTS_LENGTH = 300;

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

function extractJson(raw) {
  // Model may occasionally wrap output in ```json fences despite instructions.
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

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await withTimeout(
      groq.chat.completions.create({
        model: MODEL,
        temperature: 0.6,
        max_tokens: MAX_TOKENS,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Ingredients on hand: ${cleanIngredients}\n\nRespond with the json object described.` },
        ],
      }),
      REQUEST_TIMEOUT_MS
    );

    const raw = completion.choices?.[0]?.message?.content ?? "";
    const recipe = extractJson(raw);
    validateRecipeShape(recipe);

    return res.json({
      recipe,
      source: "Groq AI (LLaMA 3.1 8B Instant)",
    });
  } catch (error) {
    if (error.message === "TIMEOUT") {
      return res.status(504).json({ error: "The kitchen is taking too long. Please try again." });
    }

    if (error instanceof SyntaxError || /JSON/i.test(error.message)) {
      return res.status(502).json({ error: "Couldn't understand the AI's response. Please try again." });
    }

    if (error.status === 401) {
      return res.status(500).json({ error: "Server misconfiguration: invalid AI API key." });
    }

    if (error.status === 429) {
      return res.status(429).json({ error: "Too many requests right now. Please wait a moment and try again." });
    }

    console.error("Recipe generation failed:", error.message);
    return res.status(500).json({
      error: "AI generation failed. Please try again.",
      details: error.message,
    });
  }
};
