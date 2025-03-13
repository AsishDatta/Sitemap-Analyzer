import puppeteer from "puppeteer";

export const scrapeSitemap = async (url) => {
  try {
    console.log(`Scraping: ${url}`);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    let links = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a[href]")).map((a) => a.href)
    );

    await browser.close();

    if (!Array.isArray(links) || links.length === 0) {
      console.error("Error: No links found. Returning empty array.");
      return [];
    }

    console.log("Extracted Links:", links);
    return [...new Set(links)];
  } catch (error) {
    console.error("Scraping Error:", error.message);
    return [];
  }
};