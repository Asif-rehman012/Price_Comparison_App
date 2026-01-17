import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const SERP_API_KEY = process.env.SERP_API_KEY;

// ✅ Central platform config (easy to extend)
const PLATFORMS = {
  amazon: "Amazon",
  flipkart: "Flipkart",
  meesho: "Meesho",
  ebay: "eBay",
  alibaba: "Alibaba",
  indiamart: "IndiaMART",
  myntra: "Myntra",
  tatacliq: "Tata Cliq",
  jiomart: "JioMart"
};

app.get("/api/search", async (req, res) => {
  const query = req.query.q;

  try {
    // 🔥 FETCH MULTIPLE PAGES (UP TO ~50 RESULTS)
    const allResults = [];

    for (let start = 0; start < 50; start += 10) {
      const response = await axios.get("https://serpapi.com/search.json", {
        params: {
          q: query,
          tbm: "shop",
          location: "India",
          hl: "en",
          gl: "in",
          start, // ✅ pagination
          api_key: SERP_API_KEY
        }
      });

      const shoppingResults = response.data.shopping_results || [];
      const inlineResults = response.data.inline_shopping_results || [];
      const organicResults = response.data.organic_results || [];

      allResults.push(
        ...shoppingResults,
        ...inlineResults,
        ...organicResults
      );
    }

    // 🔎 FILTER + NORMALIZE DATA
    const products = allResults
      .filter(p =>
        p.extracted_price &&
        Object.keys(PLATFORMS).some(platform =>
          (
            p.source ||
            p.displayed_link ||
            ""
          )
            .toLowerCase()
            .includes(platform)
        )
      )
      .map(p => {
        // ✅ Robust product link extraction
        const productLink =
          p.link ||
          p.product_link ||
          p.inline_link ||
          (p.offers && p.offers[0] && p.offers[0].link) ||
          "";

        return {
          title: p.title,
          price: Number(p.extracted_price),
          platform: p.source || p.displayed_link,
          delivery: p.delivery || "N/A",
          link: productLink,
          image: p.thumbnail || p.product_image || ""
        };
      });

    // 🏆 CHEAPEST PRODUCT
    const cheapest = products.length
      ? products.reduce((min, p) => (p.price < min.price ? p : min))
      : null;

    res.json({ products, cheapest });

  } catch (error) {
    console.error("SerpAPI Error:", error.message);
    res.status(500).json({ error: "API Error" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
