'use client';

import React, { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Skeleton,
} from '@mui/material';
import { useJoke } from '../hooks/useJoke';
import { JokeHookReturn } from '@/types/HookReturn';

export default function JokeCard() {
  const { joke, isLoading, error }: JokeHookReturn = useJoke();

  return (
    <Card
      sx={{
        border: '1px dashed grey',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
      }}>
      <CardContent>
        {error ? (
          <Typography variant='body1' color='error'>
            Error: {error.message}
          </Typography>
        ) : isLoading ? (
          <Skeleton variant='text' width={200} height={40} />
        ) : (
          <Typography variant='h6'>{joke}</Typography>
        )}
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
