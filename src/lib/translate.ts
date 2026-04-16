export async function translateText(
  text: string,
  source: string,
  target: string
): Promise<string> {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, source, target })
  });

  if (!response.ok) {
    throw new Error('Translation failed');
  }

  const data = await response.json();
  return data.translated;
}

export async function translateBatch(
  translations: Array<{ text: string; source: string; target: string }>
): Promise<Array<{ text: string; translated: string }>> {
  const response = await fetch('/api/translate/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ translations })
  });

  if (!response.ok) {
    throw new Error('Batch translation failed');
  }

  return response.json();
}
