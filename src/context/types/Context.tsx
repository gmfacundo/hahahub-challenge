import JokeInterface from '@/interfaces/JokeInterface';

export type LikedJokes = JokeInterface[] | null;
export type SetLikedJokes = React.Dispatch<
  React.SetStateAction<JokeInterface[] | null>
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
