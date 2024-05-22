'use client';

import {
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';
import ContextInterface from '@/interfaces/ContextInterface';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { EmptyList } from './EmptyList';

export const Sidebar = ({
  likedJokes,
  setLikedJokes,
}: {
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
}) => {
  const [filteredJokes, setFilteredJokes] = useState<LikedJokes | null>(
    null
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    likedJokes && setFilteredJokes(filterJokes(likedJokes, searchValue));
  }, [likedJokes, searchValue]);

  const handleClick = (jokeId: string) => {
    router.push(`/?joke=${jokeId}`);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    jokeId: string
  ) => {
    e.stopPropagation();
    const updatedJokes: ContextInterface[] = likedJokes!.filter(
      (joke) => joke.id !== jokeId
    );
    setLikedJokes(updatedJokes);
  };

  const filterJokes = (jokes: LikedJokes, value: string) => {
    return jokes!.filter((joke) =>
      joke.joke.toLowerCase().includes(value.toLowerCase())
    );
  };

  const open: boolean = likedJokes !== null && likedJokes.length > 0;

  return (
    <Drawer
      open={open}
      sx={{
        minWidth: '30vw',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '30vw',
          boxSizing: 'border-box',
          backgroundColor: theme.palette.primary.main,
          borderLeft: `1px solid ${theme.palette.primary.dark}`,
          padding: '5px',
          boxShadow: '-10px 0px 10px -4px rgba(0,0,0,0.32)',
          WebkitBoxShadow: '-10px 0px 10px -4px rgba(0,0,0,0.32)',
          marginBottom: '1rem',
        },
      }}
      variant='persistent'
      anchor='right'>
      <SearchBar
        likedJokes={likedJokes}
        setFilteredJokes={setFilteredJokes}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {filteredJokes && filteredJokes.length ? (
        <Stack spacing={1} marginTop='.5rem'>
          {filteredJokes!.map((joke) => (
            <Paper
              key={joke.id}
              elevation={6}
              sx={{ padding: '5px 2rem 5px 5px' }}
              style={{
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: theme.palette.primary.light,
              }}
              onClick={() => handleClick(joke.id)}>
              <Typography variant='subtitle2'>{joke.joke}</Typography>
              <IconButton
                onClick={(e) => handleDelete(e, joke.id)}
                style={{
                  position: 'absolute',
                  top: '1px',
                  right: '1px',
                  padding: '4px',
                }}>
                <DeleteIcon
                  fontSize='medium'
                  sx={{ color: theme.palette.grey[700] }}
                />
              </IconButton>
            </Paper>
          ))}
        </Stack>
      ) : likedJokes && likedJokes.length ? (
        <EmptyList />
      ) : null}
    </Drawer>
  );
};
