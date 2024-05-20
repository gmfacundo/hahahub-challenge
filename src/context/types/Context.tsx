import ContextInterface from '@/interfaces/ContextInterface';

export type AppContextType = {
  likedJokes: ContextInterface[] | null;
  setLikedJokes: (jokes: ContextInterface[]) => void;
};
