const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const generateRecipeAPI = async (ingredients) => {
  let response;

  try {
    response = await fetch(`${BASE_URL}/recipe/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });
  } catch {
    throw new Error("Can't reach the kitchen right now. Check your connection and try again.");
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("The kitchen sent back something unreadable. Please try again.");
  }

  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again.");
  }

  clearTimeout(timeoutId);
  return data;
};
