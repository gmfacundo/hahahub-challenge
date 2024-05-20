import ContextInterface from '@/interfaces/ContextInterface';

export const isLiked = (
  jokes: ContextInterface[] | null,
  id: string | null | undefined
) => {
  if (jokes && id) return jokes.some((liked) => liked.id === id);
};
