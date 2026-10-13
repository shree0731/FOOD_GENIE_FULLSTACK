import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/recipe.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/recipe", recipeRoutes);

if (!process.env.GROQ_API_KEY) {
  console.warn("⚠️  GROQ_API_KEY is not set. Recipe generation will fail until it is configured in .env");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
