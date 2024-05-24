import JokeInterface from '@/interfaces/JokeInterface';

export type LikedJokes = JokeInterface[] | null;
export type SetLikedJokes = React.Dispatch<
  React.SetStateAction<JokeInterface[] | null>
>;
export type SetFetchNewJoke = React.Dispatch<
  React.SetStateAction<boolean>
>;
export type CurJoke = JokeInterface | null;
export type SetCurJoke = React.Dispatch<
  React.SetStateAction<JokeInterface | null>
>;

export type AppContextType = {
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
  curJoke: CurJoke;
  setCurJoke: SetCurJoke;
  fetchNewJoke: boolean;
  setFetchNewJoke: SetFetchNewJoke;
};
