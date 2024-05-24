'use client';

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import JokeInterface from '@/interfaces/JokeInterface';
import { AppContextType } from './types/Context';

export const AppContext = createContext<AppContextType | undefined>(
  undefined
);

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [likedJokes, setLikedJokes] = useState<JokeInterface[] | null>(
    null
  );
  const [curJoke, setCurJoke] = useState<JokeInterface | null>(null);
  const [fetchNewJoke, setFetchNewJoke] = useState<boolean>(true);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      const storedJokes = localStorage.getItem('jokes');
      if (storedJokes) {
        setLikedJokes(JSON.parse(storedJokes));
      }
      initialRender.current = false;
    }
  }, []);

  useEffect(() => {
    if (!initialRender.current) {
      localStorage.setItem('jokes', JSON.stringify(likedJokes));
    }
  }, [likedJokes]);

  return (
    <AppContext.Provider
      value={{
        likedJokes,
        setLikedJokes,
        curJoke,
        setCurJoke,
        fetchNewJoke,
        setFetchNewJoke,
      }}>
      {children}
    </AppContext.Provider>
  );
};
