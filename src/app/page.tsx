import React from 'react';
import { Container } from '@mui/material';
import Header from '@/components/Header';
import JokeCard from '@/components/JokeCard';

export default function Home() {
  return (
    <Container
      fixed
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
      className='test'>
      <Header />
      <JokeCard />
    </Container>
  );
}
