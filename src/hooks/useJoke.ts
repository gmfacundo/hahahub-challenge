import { useState, useEffect } from 'react';
import { fetchJoke } from '../utils/api';
import ApiError from '@interfaces/ErrorInterface';
import { JokeHookReturn } from '@/types/HookReturn';

type Joke = string;
type Loading = boolean;

export function useJoke(): JokeHookReturn {
  const [joke, setJoke] = useState<Joke>('');
  const [isLoading, setIsLoading] = useState<Loading>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchJokeAndSetState = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const joke: Joke | null = await fetchJoke();
        setJoke(joke ?? '');
      } catch (error) {
        setError(error as ApiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJokeAndSetState();
  }, []);

  return { joke, isLoading, error };
}
