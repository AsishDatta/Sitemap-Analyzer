import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateAIInsights = async (sitemap) => {
  try {
    console.log("Sitemap:", sitemap);
    
    if (!Array.isArray(sitemap) || sitemap.length === 0) {
      console.error("AI Error: Sitemap is empty or invalid.");
      return "Error: No valid sitemap data received.";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Analyze the company's sitemap and generate insights.\n${sitemap.join("\n")}`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const insights = response.text();

    console.log("Insights:", insights);
    return insights;
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    return "AI processing failed.";
  }
};