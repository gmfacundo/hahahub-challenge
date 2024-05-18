'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material';
import { fetchJoke } from '../utils/api'; // Importar la función de utilidad

export default function JokeCard() {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    const fetchJokeAndSetState = async () => {
      const joke = await fetchJoke();
      if (joke) {
        setJoke(joke);
      }
    };

    fetchJokeAndSetState();
  }, []);

  return (
    <Card
      sx={{
        border: '1px dashed grey',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
      }}>
      <CardContent>
        <Typography variant='h6'>{joke}</Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary'>
          Share
        </Button>
        <Button variant='outlined' color='secondary'>
          Like
        </Button>
      </CardActions>
    </Card>
  );
}
