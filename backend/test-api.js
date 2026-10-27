// Simple node test script to verify backend endpoints
import fetch from "node-fetch";

const BASE_URL = process.env.BASE_URL || "http://localhost:4000/api";

async function testHealth() {
  console.log("Checking health endpoint...");
  const res = await fetch(`${BASE_URL}/health`);
  const data = await res.json();
  console.log("Health status:", data);
}

testHealth().catch(console.error);
