import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "1mb" }));

  // API routes go here
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", brand: "Veloura Zone" });
  });

  app.post("/api/ai", async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = req.body?.prompt;
    const model = req.body?.model ?? "gemini-2.5-flash";

    if (!apiKey) {
      res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
      return;
    }

    if (typeof prompt !== "string" || !prompt.trim()) {
      res.status(400).json({ error: "A non-empty 'prompt' string is required." });
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      res.json({
        text: response.text ?? "",
      });
    } catch (error) {
      console.error("Gemini proxy error:", error);
      res.status(502).json({ error: "Failed to generate AI response." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
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
