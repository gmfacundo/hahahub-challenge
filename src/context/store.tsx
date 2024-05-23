'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import ContextInterface from '@/interfaces/ContextInterface';
import { AppContextType } from './types/Context';

export const AppContext = createContext<AppContextType | undefined>(
  undefined
);

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [likedJokes, setLikedJokes] = useState<ContextInterface[] | null>(
    null
  );
  const [curJokeId, setCurJokeId] = useState<string>('');
  const [fetchNewJoke, setFetchNewJoke] = useState<boolean>(true);

  useEffect(() => {
    const storedJokes = localStorage.getItem('jokes');
    if (storedJokes) {
      setLikedJokes(JSON.parse(storedJokes));
    }
  }, []);

  useEffect(
    () => localStorage.setItem('jokes', JSON.stringify(likedJokes)),
    [likedJokes]
  );

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
