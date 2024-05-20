'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import ContextInterface from '@/interfaces/ContextInterface';
import { AppContextType } from './types/Context';

const AppContext = createContext<AppContextType | undefined>(undefined);

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

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
};
