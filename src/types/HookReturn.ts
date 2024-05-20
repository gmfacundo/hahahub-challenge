import ApiError from '@/interfaces/ErrorInterface';
import ApiResponse from '@/interfaces/ResponseInterface';

export type JokeHookReturn = {
  joke: ApiResponse;
  isLoading: boolean;
  error: ApiError | null;
};
