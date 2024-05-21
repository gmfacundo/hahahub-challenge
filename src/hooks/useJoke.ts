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
  const { likedJokes, setCurJokeId, fetchNewJoke, setFetchNewJoke } =
    useAppContext();
  const jokeId: string | null | undefined = useSearchParams()?.get('joke');

  useEffect(() => {
    const fetchJokeAndSetState = async () => {
      setIsLoading(true);
      setError(null);
      let joke: Joke | null;
      if (isLiked(likedJokes, jokeId)) {
        joke = likedJokes!.find((joke) => joke.id === jokeId) as Joke;
        setJoke(joke);
        setCurJokeId(joke.id);
        setIsLoading(false);
      } else if (fetchNewJoke) {
        try {
          joke = await fetchJoke(jokeId);
          if (joke !== null && joke.status === 404)
            throw new Error('Cannot find the joke 😟');
          setJoke(joke || initialJoke);
          setCurJokeId(joke!.id);
          setFetchNewJoke(false);
        } catch (error) {
          setError(error as ApiError);
          setFetchNewJoke(false);
        } finally {
          setIsLoading(false);
          setFetchNewJoke(false);
        }
      }
    };
    console.log(fetchNewJoke);
    fetchJokeAndSetState();
  }, [jokeId, fetchNewJoke]);

  return { joke, isLoading, error };
}
