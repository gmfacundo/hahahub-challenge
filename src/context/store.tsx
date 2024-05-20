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

  useEffect(() => {
    const storedJokes = localStorage.getItem('jokes');
    if (storedJokes) {
      setLikedJokes(JSON.parse(storedJokes));
    }
  }, []);

  return (
    <AppContext.Provider value={{ likedJokes, setLikedJokes }}>
      {children}
    </AppContext.Provider>
  );
};