# Food Genie - Fullstack AI Recipe Generator 🍲

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express)](https://expressjs.com/)
[![Groq](https://img.shields.io/badge/Groq-AI%20Powered-F55036)](https://groq.com/)

Food Genie (Simmer) is a modern fullstack AI application that turns your leftover pantry ingredients into clear, chef-quality recipes complete with exact measurements, step-by-step directions, cooking times, and culinary tips.

Powered by **Groq Cloud API (LLaMA 3.1 8B Instant)** for ultra-fast generation speeds.

---

## 🚀 Architecture Overview

```
FOOD_GENIE_FULLSTACK/
├── backend/
│   ├── controllers/
│   │   └── recipeController.js  # AI prompt, JSON schema validation, timeout racer
│   ├── routes/
│   │   └── recipe.js            # POST /api/recipe/generate endpoint
│   ├── server.js                # Express app setup, CORS, health check
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── recipeAPI.js     # Axios/Fetch client integration
│   │   ├── Components/
│   │   │   ├── Loader.jsx       # Animated cooking loader
│   │   │   ├── RecipeCard.jsx   # Interactive recipe presentation
│   │   │   ├── RecipeForm.jsx   # Input textarea & tag parser
│   │   │   └── RecipeHistory.jsx# Saved recipes drawer
│   │   ├── App.jsx              # Application shell & state
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

---

## ✨ Features

- **Instant AI Recipe Generation:** Powered by LLaMA 3.1 8B via Groq SDK with sub-second response times.
- **Smart Tag Parsing:** Automatically parses comma-separated ingredients into interactive visual chips.
- **Structured Recipe Cards:** Displays prep time, cook time, servings, difficulty badge, ingredients checklist, and step-by-step cooking steps.
- **Chef Tips:** Includes practical cooking tips and ingredient substitution advice for each recipe.
- **Local History:** Saves recent recipes for quick reference during your session.
- **Resilient Error Handling:** Includes timeout guards (15s hard limit), response JSON schema validation, and friendly error banners.
- **Fully Responsive UI:** Custom modern CSS designed for desktops, tablets, and smartphones.

---

## 🔑 Environment Configuration

| Variable | Service | Required | Description |
|---|---|---|---|
| `PORT` | Backend | No | Port on which the API runs (default: `4000`) |
| `GROQ_API_KEY` | Backend | **Yes** | API key obtained from Groq Cloud Console |
| `VITE_API_BASE_URL` | Frontend | No | Base endpoint for the backend API |

---

## 🛠️ Tech Stack

### Frontend
- **React 18**
- **Vite**
- **Vanilla CSS3** (Custom design system, CSS variables, keyframe animations)

### Backend
- **Node.js** (ES Modules)
- **Express 5**
- **Groq Cloud SDK (`groq-sdk`)**
- **CORS & Dotenv**

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- A free [Groq API Key](https://console.groq.com/keys)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```
Edit `backend/.env` and add your Groq API key:
```env
PORT=4000
GROQ_API_KEY=gsk_your_groq_api_key_here
```

Start the backend server:
```bash
npm start
# Backend running on port 4000
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
# Vite server running on http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `POST` | `/api/recipe/generate` | Generates recipe from ingredients body |

#### Request Payload
```json
{
  "ingredients": "chicken breast, garlic, spinach, heavy cream"
}
```

#### Response Structure
```json
{
  "recipe": {
    "title": "Creamy Garlic Spinach Chicken",
    "description": "Tender pan-seared chicken bathed in a rich, garlicky cream sauce.",
    "prepTime": "10 mins",
    "cookTime": "20 mins",
    "servings": "2 servings",
    "difficulty": "Easy",
    "ingredients": [
      "2 boneless chicken breasts",
      "4 cloves garlic, minced",
      "2 cups fresh spinach",
      "1/2 cup heavy cream"
    ],
    "steps": [
      "Season chicken breasts and sear in a hot skillet until golden and cooked through.",
      "Remove chicken; saute garlic in the remaining pan juices until fragrant.",
      "Stir in heavy cream and fresh spinach, simmering until greens are wilted.",
      "Return chicken to the skillet, spoon sauce over the top, and serve warm."
    ],
    "tip": "Grate fresh parmesan over the sauce for extra savory depth."
  },
  "source": "Groq AI (LLaMA 3.1 8B Instant)"
}
```

---

## ❓ Troubleshooting & FAQs

- **Error: `GROQ_API_KEY is not set`:** Ensure you have copied `.env.example` to `.env` inside `backend/` and populated your valid API key.
- **Error: `429 Too Many Requests`:** The free Groq tier has per-minute token limits. Wait a few moments before submitting another request.
- **Frontend cannot reach backend:** Ensure backend is running on `http://localhost:4000` or check `VITE_API_BASE_URL` in `frontend/.env`.

---

## 📄 License
ISC License. Built for Fullstack Internship Project.

<!-- commit: refactor(frontend): add JSDoc type definitions to recipeAPI service -->
