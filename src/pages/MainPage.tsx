'use client';

import { Box, Container, Drawer, Paper } from '@mui/material';
import Header from '@/components/Header';
import JokeCard from '@/components/JokeCard';
import './styles.css';
import { useAppContext } from '@/hooks/useAppContext';

export default function MainPage() {
  const { likedJokes } = useAppContext();
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
      <Box>
        <Header />
        <JokeCard />
      </Box>
      <Box
        component='nav'
        sx={{ width: { sm: '25vw' }, flexShrink: { sm: 0 } }}>
        {likedJokes && likedJokes.length > 0 && (
          <Drawer
            sx={{
              width: '25vw',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: '25vw',
                boxSizing: 'border-box',
                backgroundColor: 'red',
              },
            }}
            variant='permanent'
            anchor='right'>
            {likedJokes.map((joke) => (
              <Paper key={joke.id}>{joke.joke}</Paper>
            ))}
          </Drawer>
        )}
      </Box>
    </Container>
  );
}
