import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTokenSchema, insertTransferSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get tokens by wallet address
  app.get("/api/tokens/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const tokens = await storage.getTokensByWallet(walletAddress);
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tokens" });
    }
  });

  // Get token by mint address
  app.get("/api/token/:mintAddress", async (req, res) => {
    try {
      const { mintAddress } = req.params;
      const token = await storage.getTokenByMintAddress(mintAddress);
      if (!token) {
        return res.status(404).json({ message: "Token not found" });
      }
      res.json(token);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch token" });
    }
  });

  // Create a new token
  app.post("/api/tokens", async (req, res) => {
    try {
      const validatedData = insertTokenSchema.parse(req.body);
      const token = await storage.createToken(validatedData);
      res.status(201).json(token);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid token data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create token" });
    }
  });

  // Get transfers for a wallet
  app.get("/api/transfers/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const transfers = await storage.getTransfersByWallet(walletAddress);
      res.json(transfers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transfers" });
    }
  });

  // Record a transfer
  app.post("/api/transfers", async (req, res) => {
    try {
      const validatedData = insertTransferSchema.parse(req.body);
      const transfer = await storage.createTransfer(validatedData);
      res.status(201).json(transfer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transfer data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to record transfer" });
    }
  });

  // Get network status
  app.get("/api/network/status", async (req, res) => {
    try {
      res.json({
        network: "devnet",
        status: "connected",
        rpcEndpoint: "https://api.devnet.solana.com"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get network status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
