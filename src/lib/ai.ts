interface AiRequest {
  prompt: string;
  model?: string;
}

interface AiResponse {
  text: string;
}

export async function generateAiContent({ prompt, model }: AiRequest): Promise<AiResponse> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, model }),
  });

  if (!response.ok) {
    throw new Error('AI request failed');
  }

  return response.json();
}
