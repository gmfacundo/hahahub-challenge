import { useAppContext } from '@/hooks/useAppContext';
import { Button, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

export function NewJokeButton({ path }: { path: URL | null }) {
  const router = useRouter();
  const { setFetchNewJoke } = useAppContext();
  const handleClick = () => {
    setFetchNewJoke(true);
    router.push(path!.origin);
  };

  const theme = useTheme();

  return (
    <Button
      variant={'contained'}
      sx={{
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.light,
        },
        color: theme.palette.grey[700],
        fontWeight: '600',
      }}
      size='medium'
      onClick={handleClick}>
      Get another joke
    </Button>
  );
}
