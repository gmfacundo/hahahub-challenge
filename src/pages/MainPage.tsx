'use client';

import { Box, Container } from '@mui/material';
import { useAppContext } from '@/hooks/useAppContext';
import { Sidebar } from '@/components/Sidebar';
import { MainContent } from '@/components/MainContent/MainContent';

export default function MainPage() {
  const { likedJokes, setLikedJokes, curJokeId } = useAppContext();

  return (
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
      <MainContent
        likedJokes={likedJokes}
        setLikedJokes={setLikedJokes}
        curJokeId={curJokeId}
      />
      <Box component='nav'>
        <Sidebar likedJokes={likedJokes} setLikedJokes={setLikedJokes} />
      </Box>
    </Container>
  );
}
