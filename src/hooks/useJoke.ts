import { useState, useEffect } from 'react';
import { fetchJoke } from '../utils/api';
import ApiError from '@interfaces/ErrorInterface';
import { JokeHookReturn } from '@/types/HookReturn';
import ApiResponse from '@/interfaces/ResponseInterface';
import { useAppContext } from '@/hooks/useAppContext';
import { isLiked } from '@/utils/helpers';

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

  useEffect(() => {
    const urlSerachParams = new URLSearchParams(window.location.search);
    const jokeId: string | null = urlSerachParams.get('joke');

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
  }, []);

  return { joke, isLoading, error };
}
