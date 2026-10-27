import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/recipe.js";

const app = express();

app.use(cors());
app.use(express.json());

// Simple request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "Food Genie Backend API"
  });
});

app.use("/api/recipe", recipeRoutes);

// Handle malformed JSON body errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON payload in request." });
  }
  next(err);
});

if (!process.env.GROQ_API_KEY) {
  console.warn("⚠️  GROQ_API_KEY is not set. Recipe generation will fail until it is configured in .env");
}

// 404 Fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

// Graceful shutdown listeners
const shutdown = () => {
  console.log('\nGracefully stopping server...');
  server.close(() => process.exit(0));
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
