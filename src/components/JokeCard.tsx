'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Skeleton,
  useTheme,
} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { isLiked } from '@/utils/helpers';
import JokeInterface from '@/interfaces/JokeInterface';
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
  const theme = useTheme();

  const handleLike = () => {
    let updatedJokes: JokeInterface[];

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
        backgroundColor: theme.palette.primary.light,
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
                  style={{ color: theme.palette.primary.main }}
                />
              ) : (
                <FavoriteBorderOutlinedIcon
                  fontSize='large'
                  style={{ color: theme.palette.primary.main }}
                />
              )}
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
