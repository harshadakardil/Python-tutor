export async function apiRequest(
    method: string,
    url: string,
    data?: unknown,
  ): Promise<Response> {
    const res = await fetch(`${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
  
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText);
    }
  
    return res;
  }
  