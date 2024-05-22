'use client';

import { Container, ThemeProvider } from '@mui/material';
import { useAppContext } from '@/hooks/useAppContext';
import { MainContent } from '@/components/MainContent/MainContent';
import { Suspense } from 'react';
import { SavedJokes } from './SavedJokes';
import theme from '@/theme/theme';

export default function MainPage() {
  const { likedJokes, setLikedJokes, curJokeId } = useAppContext();

  return (
    <ThemeProvider theme={theme}>
      <Container
        fixed
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          minWidth: '100vw',
          margin: '0px',
        }}
        className='app-container'>
        <Suspense>
          <MainContent
            likedJokes={likedJokes}
            setLikedJokes={setLikedJokes}
            curJokeId={curJokeId}
          />
        </Suspense>
        <SavedJokes
          likedJokes={likedJokes}
          setLikedJokes={setLikedJokes}
        />
      </Container>
    </ThemeProvider>
  );
}
