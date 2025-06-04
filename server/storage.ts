import { tokens, tokenTransfers, type Token, type InsertToken, type TokenTransfer, type InsertTransfer } from "@shared/schema";

export interface IStorage {
  // Token operations
  createToken(token: InsertToken): Promise<Token>;
  getTokensByWallet(walletAddress: string): Promise<Token[]>;
  getTokenByMintAddress(mintAddress: string): Promise<Token | undefined>;
  
  // Transfer operations
  createTransfer(transfer: InsertTransfer): Promise<TokenTransfer>;
  getTransfersByToken(tokenId: number): Promise<TokenTransfer[]>;
  getTransfersByWallet(walletAddress: string): Promise<TokenTransfer[]>;
}

export class MemStorage implements IStorage {
  private tokens: Map<number, Token>;
  private transfers: Map<number, TokenTransfer>;
  private currentTokenId: number;
  private currentTransferId: number;

  constructor() {
    this.tokens = new Map();
    this.transfers = new Map();
    this.currentTokenId = 1;
    this.currentTransferId = 1;
  }

  async createToken(insertToken: InsertToken): Promise<Token> {
    const id = this.currentTokenId++;
    const token: Token = {
      ...insertToken,
      id,
      decimals: insertToken.decimals ?? 9,
      description: insertToken.description ?? null,
      createdAt: new Date(),
    };
    this.tokens.set(id, token);
    return token;
  }

  async getTokensByWallet(walletAddress: string): Promise<Token[]> {
    return Array.from(this.tokens.values()).filter(
      token => token.creatorWallet === walletAddress
    );
  }

  async getTokenByMintAddress(mintAddress: string): Promise<Token | undefined> {
    return Array.from(this.tokens.values()).find(
      token => token.mintAddress === mintAddress
    );
  }

  async createTransfer(insertTransfer: InsertTransfer): Promise<TokenTransfer> {
    const id = this.currentTransferId++;
    const transfer: TokenTransfer = {
      ...insertTransfer,
      id,
      createdAt: new Date(),
    };
    this.transfers.set(id, transfer);
    return transfer;
  }

  async getTransfersByToken(tokenId: number): Promise<TokenTransfer[]> {
    return Array.from(this.transfers.values()).filter(
      transfer => transfer.tokenId === tokenId
    );
  }

  async getTransfersByWallet(walletAddress: string): Promise<TokenTransfer[]> {
    return Array.from(this.transfers.values()).filter(
      transfer => transfer.fromWallet === walletAddress || transfer.toWallet === walletAddress
    );
  }
}

export const storage = new MemStorage();
