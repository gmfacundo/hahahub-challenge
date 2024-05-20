import { useContext } from 'react';
import { AppContextType } from '@/context/types/Context';
import { AppContext } from '@/context/store';

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppWrapper');
  }
  return context;
};
