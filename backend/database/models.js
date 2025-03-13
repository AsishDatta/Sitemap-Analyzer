import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: String,
  website: String,
  sitemap: [String],
  insights: String,
});

const Company = mongoose.model("Company", companySchema);
export default Company;
