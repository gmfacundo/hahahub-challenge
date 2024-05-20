import ContextInterface from '@/interfaces/ContextInterface';

export type AppContextType = {
  likedJokes: ContextInterface[] | null;
  setLikedJokes: React.Dispatch<
    React.SetStateAction<ContextInterface[] | null>
  >;
};
