import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import Header from '@/components/Header';
import { useJoke } from '@/hooks/useJoke';
import JokeCard from '@/components/JokeCard';
import { JokeHookReturn } from '@/types/HookReturn';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';
import { Share } from '../Share/Share';
import { Footer } from '../Footer/Footer';

import './styles.css';

export function MainContent({
  curJokeId,
  likedJokes,
  setLikedJokes,
}: {
  curJokeId: string;
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
}) {
  const [path, setPath] = useState<URL | null>(null);
  const { joke, isLoading, error }: JokeHookReturn = useJoke();

  useEffect(() => {
    if (window !== undefined) setPath(new URL(window.location.href));
  }, [curJokeId]);

  const theme = useTheme();

  const showShare = !error || (!isLoading && joke.joke.length > 0); //Any error, is not loading and there already is a joke.

  return (
    <Box
      component='main'
      sx={{
        p: 3,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: '-30vw',
        ...(likedJokes &&
          likedJokes?.length > 0 && {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
          }),
        position: 'relative',
      }}
      height='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'>
      <Header />
      <JokeCard
        joke={joke}
        isLoading={isLoading}
        error={error}
        likedJokes={likedJokes}
        setLikedJokes={setLikedJokes}
      />
      {showShare ? <Share path={path} curJokeId={curJokeId} /> : null}
      <Footer path={path} isLoading={isLoading} />
    </Box>
  );
}
