// src/api/client.ts

import { TutorConfig, Lesson, ChatResponse, CodeExecutionResult } from '@/types';

const API_BASE_URL = 'http://localhost:5000/api';

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new APIError(
      response.status,
      error.message || `API Error: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

export const apiClient = {
  async chat(prompt: string, character: string): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, character }),
    });
    return handleResponse<ChatResponse>(response);
  },

  async getLessons(): Promise<Lesson[]> {
    const response = await fetch(`${API_BASE_URL}/lessons`);
    return handleResponse<Lesson[]>(response);
  },

  async getLesson(id: number): Promise<Lesson> {
    const response = await fetch(`${API_BASE_URL}/lessons/${id}`);
    return handleResponse<Lesson>(response);
  },

  async updateConfig(config: Partial<TutorConfig>): Promise<{ status: string }> {
    const response = await fetch(`${API_BASE_URL}/configure`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    return handleResponse<{ status: string }>(response);
  },

  async executeCode(code: string): Promise<CodeExecutionResult> {
    const response = await fetch(`${API_BASE_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    return handleResponse<CodeExecutionResult>(response);
  },
};