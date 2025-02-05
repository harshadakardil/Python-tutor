import { conversations, type Conversation, type InsertConversation } from "@shared/schema";

export interface IStorage {
  createConversation(conversation: InsertConversation & { answer: string }): Promise<Conversation>;
  getConversations(): Promise<Conversation[]>;
}

export class MemStorage implements IStorage {
  private conversations: Map<number, Conversation>;
  private currentId: number;

  constructor() {
    this.conversations = new Map();
    this.currentId = 1;
  }

  async createConversation(insertConversation: InsertConversation & { answer: string }): Promise<Conversation> {
    const id = this.currentId++;
    const conversation: Conversation = { ...insertConversation, id };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values());
  }
}

export const storage = new MemStorage();