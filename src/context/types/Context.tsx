import ContextInterface from '@/interfaces/ContextInterface';

export type LikedJokes = ContextInterface[] | null;
export type SetLikedJokes = (jokes: ContextInterface[]) => void;

export type AppContextType = {
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
  curJokeId: string;
  setCurJokeId: (curJokeId: string) => void;
};
