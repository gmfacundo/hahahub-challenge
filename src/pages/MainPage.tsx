'use client';

import { Container, Drawer, Paper } from '@mui/material';
import Header from '@/components/Header';
import JokeCard from '@/components/JokeCard';
import './styles.css';
import { useAppContext } from '@/context/store';

export default function MainPage() {
  const { likedJokes } = useAppContext();
  const drawerWidth = 240;
  return (
    <Container
      fixed
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        margin: '0px',
      }}
      className='app-container'>
      <Header />
      <JokeCard />
      {likedJokes && likedJokes.length > 0 && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='permanent'
          anchor='right'>
          {likedJokes.map((joke) => (
            <Paper key={joke.id}>{joke.joke}</Paper>
          ))}
        </Drawer>
      )}
    </Container>
  );
}
