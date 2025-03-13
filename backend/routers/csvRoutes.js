import express from "express";
import multer from "multer";
import { processCSV, downloadCSV } from "../controllers/csvController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("csvFile"), processCSV);
router.get("/download", downloadCSV);

export default router;
