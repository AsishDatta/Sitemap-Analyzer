import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { scrapeSitemap } from "./scraperController.js";
import { generateAIInsights } from "./aiController.js";
import Company from "../database/models.js";
import { Parser } from "json2csv";

export const processCSV = async (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      console.log("Read Row:", data); // Check if "Company" field exists
      results.push(data);
    })
    .on("end", async () => {
      for (const row of results) {
        const { Company: name, Website: website } = row;
        const sitemap = await scrapeSitemap(website);
        const insights = await generateAIInsights(sitemap);
        
        await Company.findOneAndUpdate(
          { website },
          { name, website, sitemap, insights },
          { upsert: true }
        );
      }
      res.json({ message: "Processing complete" });
    });
};

export const downloadCSV = async (req, res) => {
  const companies = await Company.find();
  const fields = ["name", "website", "sitemap", "insights"];
  const parser = new Parser({ fields });
  const csv = parser.parse(companies);
  
  const filePath = path.join("output", "processed.csv");
  fs.writeFileSync(filePath, csv);
  res.download(filePath);
};
