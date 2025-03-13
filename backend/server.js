import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import csvRoutes from "./routers/csvRoutes.js";
import scraperRoutes from "./routers/sraperRoutes.js";
import aiRoutes from "./routers/aiRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/scraper", scraperRoutes);
app.use("/api/ai", aiRoutes);

// Routes
app.use("/api", csvRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});