'use client';

import { Suspense } from 'react';
import { Container, ThemeProvider } from '@mui/material';
import { useAppContext } from '@/hooks/useAppContext';
import { MainContent } from '@/components/MainContent/MainContent';
import theme from '@/theme/theme';
import { SavedJokes } from './SavedJokes/SavedJokes';

export default function MainPage() {
  const { likedJokes, setLikedJokes, curJoke } = useAppContext();
  console.log('render');
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
            curJoke={curJoke}
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
