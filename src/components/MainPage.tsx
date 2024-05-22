'use client';

import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { useAppContext } from '@/hooks/useAppContext';
import { Sidebar } from '@/components/Sidebar';
import { MainContent } from '@/components/MainContent/MainContent';
import SwipeableEdgeDrawer from '@/components/SwipeableDrawer';
import { Suspense } from 'react';

export default function MainPage() {
  const { likedJokes, setLikedJokes, curJokeId } = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); //750

  const open: boolean = likedJokes !== null && likedJokes.length > 0;

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
      <Suspense>
        <MainContent
          likedJokes={likedJokes}
          setLikedJokes={setLikedJokes}
          curJokeId={curJokeId}
        />
      </Suspense>
      {isMobile && open ? (
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
