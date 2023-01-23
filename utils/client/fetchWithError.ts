export async function fetchWithError(url: string, options?: RequestInit) {
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
