'use client';

import {
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { EmptyList } from './EmptyList';
import { useSortable } from '@dnd-kit/sortable';
import JokeItemDesktop from './JokeItemDesktop';

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
  const theme = useTheme();

  useEffect(() => {
    likedJokes && setFilteredJokes(filterJokes(likedJokes, searchValue));
  }, [likedJokes, searchValue]);

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
            <JokeItemDesktop
              key={joke.id}
              joke={joke}
              likedJokes={likedJokes}
              setLikedJokes={setLikedJokes}
            />
          ))}
        </Stack>
      ) : likedJokes && likedJokes.length ? (
        <EmptyList />
      ) : null}
    </Drawer>
  );
};
