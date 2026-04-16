export async function scanImage(imageFile: File): Promise<any> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch('/api/scanner', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Scanner request failed');
  }

  return response.json();
}
