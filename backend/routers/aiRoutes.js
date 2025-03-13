import express from "express";
import { generateAIInsights } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  console.log("Received Request:", req.body);

  const { sitemap } = req.body;
  if (!Array.isArray(sitemap) || sitemap.length === 0) {
    return res.status(400).json({ error: "Sitemap must be a valid array of URLs." });
  }

  try {
    const insights = await generateAIInsights(sitemap);
    res.json({ insights });
  } catch (error) {
    res.status(500).json({ error: "AI analysis failed", details: error.message });
  }
});

export default router;