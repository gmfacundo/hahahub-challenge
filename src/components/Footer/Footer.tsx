import { Box } from '@mui/material';
import { Countdown } from './Countdown';
import { NewJokeButton } from './NewJokeButton';

export function Footer({
  path,
  isLoading,
}: {
  path: URL | null;
  isLoading: boolean;
}) {
  const showCountdown = path && !/[?&]joke=/.test(path.search); //Path doesn't havy query param 'joke'

  return (
    <Box paddingTop='2rem'>
      {showCountdown ? (
        <Countdown />
      ) : !isLoading ? (
        <NewJokeButton path={path} />
      ) : null}
    </Box>
  );
}
