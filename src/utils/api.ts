export async function fetchJoke() {
  const headers = { headers: { Accept: 'application/json' } };

  try {
    const response = await fetch('https://icanhazdadjoke.com/', headers);
    if (!response.ok) {
      throw new Error('Failed to fetch joke');
    }
    const data = await response.json();
    return data.joke;
  } catch (error) {
    console.error('Error fetching joke:', error);
    return null;
  }
}
