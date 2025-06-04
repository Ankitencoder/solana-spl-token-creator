import { pgTable, text, serial, integer, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  mintAddress: text("mint_address").notNull().unique(),
  decimals: integer("decimals").notNull().default(9),
  initialSupply: decimal("initial_supply", { precision: 20, scale: 0 }).notNull(),
  description: text("description"),
  creatorWallet: text("creator_wallet").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tokenTransfers = pgTable("token_transfers", {
  id: serial("id").primaryKey(),
  tokenId: integer("token_id").references(() => tokens.id).notNull(),
  fromWallet: text("from_wallet").notNull(),
  toWallet: text("to_wallet").notNull(),
  amount: decimal("amount", { precision: 20, scale: 9 }).notNull(),
  signature: text("signature").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTokenSchema = createInsertSchema(tokens).omit({
  id: true,
  createdAt: true,
});

export const insertTransferSchema = createInsertSchema(tokenTransfers).omit({
  id: true,
  createdAt: true,
});

export type InsertToken = z.infer<typeof insertTokenSchema>;
export type Token = typeof tokens.$inferSelect;
export type InsertTransfer = z.infer<typeof insertTransferSchema>;
export type TokenTransfer = typeof tokenTransfers.$inferSelect;
