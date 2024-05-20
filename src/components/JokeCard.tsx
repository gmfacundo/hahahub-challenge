'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Skeleton,
  IconButton,
  Box,
} from '@mui/material';
import { useJoke } from '../hooks/useJoke';
import { JokeHookReturn } from '@/types/HookReturn';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useAppContext } from '@/context/store';

export default function JokeCard() {
  const { joke, isLoading, error }: JokeHookReturn = useJoke();
  const { likedJokes, setLikedJokes } = useAppContext();

  const handleLike = () => {
    setLikedJokes((prev) => {
      if (!prev) {
        return [joke];
      }
      const isLiked = prev.some((liked) => liked.id === joke.id);
      const updatedJokes = isLiked
        ? prev.filter((liked) => liked.id !== joke.id)
        : [...prev, joke];
      localStorage.setItem('jokes', JSON.stringify(updatedJokes));
      return updatedJokes;
    });
  };

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
          <Box paddingRight='4rem'>
            <Typography variant='h6'>{joke.joke}</Typography>
            <IconButton
              onClick={handleLike}
              style={{
                position: 'absolute',
                top: '.5rem',
                right: '.5rem',
              }}>
              {likedJokes?.some((liked) => liked.id === joke.id) ? (
                <FavoriteOutlinedIcon
                  fontSize='large'
                  style={{ color: '#F97242' }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  fontSize='large'
                  style={{ color: '#F97242' }}
                />
              )}
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
