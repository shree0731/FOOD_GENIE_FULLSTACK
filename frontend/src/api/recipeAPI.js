const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function generateRecipeAPI(ingredients) {
  const response = await fetch(`${API_BASE_URL}/recipe/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  return response.json();
}
