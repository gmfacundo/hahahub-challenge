import ContextInterface from '@/interfaces/ContextInterface';

export type LikedJokes = ContextInterface[] | null;
export type SetLikedJokes = React.Dispatch<
  React.SetStateAction<ContextInterface[] | null>
>;
export type SetFetchNewJoke = React.Dispatch<
  React.SetStateAction<boolean>
>;

export type AppContextType = {
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
  curJokeId: string;
  setCurJokeId: (curJokeId: string) => void;
  fetchNewJoke: boolean;
  setFetchNewJoke: SetFetchNewJoke;
};
