'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import ContextInterface from '@/interfaces/ContextInterface';
import { AppContextType } from './types/Context';

export const AppContext = createContext<AppContextType | undefined>(
  undefined
);

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [likedJokes, setLikedJokesAux] = useState<
    ContextInterface[] | null
  >(null);
  const [curJokeId, setCurJokeId] = useState<string>('');
  const [fetchNewJoke, setFetchNewJoke] = useState<boolean>(true);

  const setLikedJokes = (
    jokes?: ContextInterface[],
    curJokeId?: string
  ) => {
    jokes && setLikedJokesAux(jokes);
    curJokeId && setCurJokeId(curJokeId);
    localStorage.setItem('jokes', JSON.stringify(jokes));
  };

  useEffect(() => {
    const storedJokes = localStorage.getItem('jokes');
    if (storedJokes) {
      setLikedJokes(JSON.parse(storedJokes));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        likedJokes,
        setLikedJokes,
        curJokeId,
        setCurJokeId,
        fetchNewJoke,
        setFetchNewJoke,
      }}>
      {children}
    </AppContext.Provider>
  );
};
