import { useState, useEffect } from 'react';
import { fetchJoke } from '../utils/api';
import ApiError from '@interfaces/ErrorInterface';
import { JokeHookReturn } from '@/types/HookReturn';
import ApiResponse from '@/interfaces/ResponseInterface';
import { useAppContext } from '@/hooks/useAppContext';
import { isLiked } from '@/utils/helpers';
import { useSearchParams } from 'next/navigation';

type Joke = ApiResponse;
type Loading = boolean;

const initialJoke: Joke = {
  id: '',
  joke: '',
  status: 0,
};

export function useJoke(): JokeHookReturn {
  const [joke, setJoke] = useState<Joke>(initialJoke);
  const [isLoading, setIsLoading] = useState<Loading>(true);
  const [error, setError] = useState<ApiError | null>(null);
  const { likedJokes } = useAppContext();
  const jokeId: string | null | undefined = useSearchParams()?.get('joke');

  useEffect(() => {
    const fetchJokeAndSetState = async () => {
      setIsLoading(true);
      setError(null);
      let joke: Joke | null;
      if (isLiked(likedJokes, jokeId)) {
        joke = likedJokes!.find((joke) => joke.id === jokeId) as Joke;
        setJoke(joke);
        setIsLoading(false);
      } else {
        try {
          joke = await fetchJoke(jokeId);
          setJoke(joke || initialJoke);
        } catch (error) {
          setError(error as ApiError);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchJokeAndSetState();
  }, [jokeId]);

  return { joke, isLoading, error };
}
