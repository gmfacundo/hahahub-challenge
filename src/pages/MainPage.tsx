'use client';

import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { useAppContext } from '@/hooks/useAppContext';
import { Sidebar } from '@/components/Sidebar';
import { MainContent } from '@/components/MainContent/MainContent';
import SwipeableEdgeDrawer from '@/components/SwipeableDrawer';

export default function MainPage() {
  const { likedJokes, setLikedJokes, curJokeId } = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); //750

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
      {isMobile ? (
        <SwipeableEdgeDrawer
          likedJokes={likedJokes}
          setLikedJokes={setLikedJokes}
        />
      ) : (
        <Box component='nav'>
          <Sidebar likedJokes={likedJokes} setLikedJokes={setLikedJokes} />
        </Box>
      )}
    </Container>
  );
}
