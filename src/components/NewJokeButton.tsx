import { useAppContext } from '@/hooks/useAppContext';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export function NewJokeButton({ path }: { path: URL | null }) {
  const router = useRouter();
  const { setFetchNewJoke } = useAppContext();
  const handleClick = () => {
    setFetchNewJoke(true);
    router.push(path!.origin);
  };

  return (
    <Button
      variant={'contained'}
      sx={{
        backgroundColor: '#FECCA7',
        '&:hover': { backgroundColor: '#F97242', color: '#FECCA7' },
        color: '#5C5C5C',
        fontWeight: '600',
      }}
      size='medium'
      onClick={handleClick}>
      Get another joke
    </Button>
  );
}
