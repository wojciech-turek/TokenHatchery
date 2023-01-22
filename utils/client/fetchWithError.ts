export async function fetchWithError(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  if (response.status >= 400) {
    throw new Error(
      `Error fetching ${url}: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}
