import ContextInterface from '@/interfaces/ContextInterface';

export const isLiked = (jokes: ContextInterface[], id: string) =>
  jokes.some((liked) => liked.id === id);
