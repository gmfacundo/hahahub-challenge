'use client';

import { Box, Container, Drawer, Paper } from '@mui/material';
import { useTheme } from '@mui/material';
import Header from '@/components/Header';
import JokeCard from '@/components/JokeCard';
import './styles.css';
import { useAppContext } from '@/hooks/useAppContext';
import { Sidebar } from '@/components/Sidebar';

export default function MainPage() {
  const { likedJokes, setLikedJokes } = useAppContext();
  const theme = useTheme();
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
        }}>
        <Header />
        <JokeCard />
      </Box>
      <Box component='nav'>
        <Sidebar likedJokes={likedJokes} setLikedJokes={setLikedJokes} />
      </Box>
    </Container>
  );
}
