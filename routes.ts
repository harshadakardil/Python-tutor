import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { getAnswer } from "./openai";
import { insertConversationSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  app.post("/api/ask", async (req, res) => {
    try {
      const parsed = insertConversationSchema.parse(req.body);
      const answer = await getAnswer(parsed.question, parsed.character);
      const conversation = await storage.createConversation({
        ...parsed,
        answer
      });
      res.json(conversation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/conversations", async (_req, res) => {
    try {
      const conversations = await storage.getConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return createServer(app);
}