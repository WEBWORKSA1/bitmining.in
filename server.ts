import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Define Leads JSON storage path
const LEADS_FILE_PATH = path.join(process.cwd(), "leads.json");

// Helper to write lead securely
function saveLead(lead: any) {
  try {
    let leads = [];
    if (fs.existsSync(LEADS_FILE_PATH)) {
      const data = fs.readFileSync(LEADS_FILE_PATH, "utf-8");
      leads = JSON.parse(data || "[]");
    }
    leads.push({
      ...lead,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    });
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving lead:", err);
    return false;
  }
}

// 1. API - Submit Lead
app.post("/api/leads", (req, res) => {
  const { name, email, company, hashrate, energySource, message, location } = req.body;

  if (!email || !name) {
    return res.status(400).json({ success: false, error: "Name and email are required." });
  }

  const success = saveLead({ name, email, company, hashrate, energySource, message, location });

  // Simulate routing/alerting to webworksa1@gmail.com (Kept 100% hidden from UI client)
  console.log(`[ALERT] Secret Lead Dispatch to webworksa1@gmail.com:`, {
    name,
    email,
    company,
    hashrate,
    energySource,
    message,
    location,
  });

  if (success) {
    res.json({
      success: true,
      message: "Lead submitted successfully. Our lead analyst will review your profile and contact you within 24 hours.",
    });
  } else {
    res.status(500).json({ success: false, error: "Internal server error occurred while writing lead." });
  }
});

// 2. API - AI Crypto & Mining Advisor (Gemini integration with grounding or expert prompting)
app.post("/api/gemini/consult", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY in the Secrets panel."
      });
    }

    const aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = 
      "You are the Director of BitMining.in, an expert cryptocurrency mining consultant with 25 years of " +
      "experience in the Indian technology sector, power grid infrastructure, and global Bitcoin development. " +
      "Your tone is professional, authoritative, culturally aware, pragmatic, and highly analytical. " +
      "You understand Indian electrical tariffs (standard commercial, industrial, and subsidized agricultural rates), " +
      "clean energy growth (solar in Rajasthan/Karnataka, wind in Tamil Nadu, hydroelectric power in Himachal Pradesh/Uttarakhand), " +
      "the regulatory climate of cryptocurrency in India, and the operational physics of ASIC miners (such as Antminer S21, S19 Pro, Whatsminer M50s). " +
      "Always provide deep economic calculations in both US Dollars ($) and Indian Rupees (₹) where relevant. " +
      "Keep answers focused, high-intent, avoiding fluff or generic intro statements. Ground your advices in real-world feasibility.";

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: err.message || "An error occurred with the AI service." });
  }
});

// 3. API - YouTube configurations and Fallback Videos
app.get("/api/youtube/latest", async (req, res) => {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const youTubeApiKey = process.env.YOUTUBE_API_KEY;

  // Let's have a set of high-quality educational videos about green/clean energy Bitcoin mining in 2026 as fallbacks.
  const fallbackVideos = [
    {
      id: "9ZgApxUvVq8", // "Bitcoin Mining and the Clean Energy Revolution"
      title: "Bitcoin Mining & The Clean Energy Revolution",
      description: "How computational grids stabilize renewable energy fields and lead global green hashrate adoption.",
    },
    {
      id: "K8-YgVda8hE", // "How Bitcoin Mining Works"
      title: "The Industrial Physics of Bitcoin Mining",
      description: "A deep dive into ASICs, energy grids, hash difficulty alignment, and computational thermodynamics.",
    },
    {
      id: "Y972K9D9I2U", // Popular mining video
      title: "Green Energy Solutions for Decarbonized Computations",
      description: "Exploring solar and hydro microgrids for state-of-the-art bitcoin mining farms.",
    }
  ];

  if (channelId && youTubeApiKey) {
    try {
      // Fetch latest upload from the channel using official YouTube v3 channels or search
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${encodeURIComponent(youTubeApiKey)}&channelId=${encodeURIComponent(channelId)}&part=snippet,id&order=date&maxResults=1&type=video`;
      const fetchResponse = await fetch(searchUrl);
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          return res.json({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            isCustom: true,
          });
        }
      }
    } catch (err) {
      console.error("Error fetching latest YouTube video:", err);
    }
  }

  // Fallback to our premium pre-curated video
  res.json({
    id: fallbackVideos[0].id,
    title: fallbackVideos[0].title,
    description: fallbackVideos[0].description,
    isCustom: false,
    list: fallbackVideos,
  });
});

// 4. Vite Middleware and SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
