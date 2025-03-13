import express from "express";
import { scrapeSitemap } from "../controllers/scraperController.js";

const router = express.Router();

router.post("/scrape", async (req, res) => {
  const { website } = req.body;
  if (!website) return res.status(400).json({ error: "Website URL is required" });

  try {
    const sitemap = await scrapeSitemap(website);
    res.json({ sitemap });
  } catch (error) {
    res.status(500).json({ error: "Scraping failed", details: error.message });
  }
});

export default router;
