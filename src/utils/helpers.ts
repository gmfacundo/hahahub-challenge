import JokeInterface from '@/interfaces/JokeInterface';

export const isLiked = (
  jokes: JokeInterface[] | null,
  id: string | null | undefined
) => {
  if (jokes && id) return jokes.some((liked) => liked.id === id);
};
