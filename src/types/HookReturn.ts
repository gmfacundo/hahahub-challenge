import ApiError from '@/interfaces/ErrorInterface';

export type JokeHookReturn = {
  joke: string;
  isLoading: boolean;
  error: ApiError | null;
};
