'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Skeleton,
} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { isLiked } from '@/utils/helpers';
import ContextInterface from '@/interfaces/ContextInterface';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';
import ApiResponse from '@/interfaces/ResponseInterface';
import ApiError from '@/interfaces/ErrorInterface';

export default function JokeCard({
  joke,
  isLoading,
  error,
  likedJokes,
  setLikedJokes,
}: {
  joke: ApiResponse;
  isLoading: boolean;
  error: ApiError | null;
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
}) {
  const handleLike = () => {
    let updatedJokes: ContextInterface[];

    if (!likedJokes) {
      updatedJokes = [joke];
    } else {
      updatedJokes = isLiked(likedJokes, joke.id)
        ? likedJokes!.filter((liked) => liked.id !== joke.id)
        : [...likedJokes!, joke];
    }

    setLikedJokes(updatedJokes);
  };
  return (
    <Card
      sx={{
        border: '1px dashed grey',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
      }}>
      <CardContent
        sx={{
          '&:last-child': { paddingBottom: '16px' },
        }}>
        {error ? (
          <Typography variant='body1' color='error'>
            {error.message}
          </Typography>
        ) : isLoading || joke.joke.length === 0 ? (
          <Skeleton variant='text' width={'15rem'} height={'1rem'} />
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
              {isLiked(likedJokes, joke.id) ? (
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
