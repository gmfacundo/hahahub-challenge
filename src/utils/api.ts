import ApiResponse from '@/interfaces/ResponseInterface';

export async function fetchJoke(
  jokeId: string | null
): Promise<ApiResponse | null> {
  const headers = { headers: { Accept: 'application/json' } };

  try {
    const response = await fetch(
      `https://icanhazdadjoke.com/${jokeId ? `j/${jokeId}` : ''}`,
      headers
    );
    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching joke:', error);
    return null;
  }
}
