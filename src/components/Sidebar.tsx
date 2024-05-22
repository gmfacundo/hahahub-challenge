'use client';

import {
  Drawer,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';
import ContextInterface from '@/interfaces/ContextInterface';
import { useRouter } from 'next/navigation';

export const Sidebar = ({
  likedJokes,
  setLikedJokes,
}: {
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
}) => {
  const router = useRouter();
  const theme = useTheme();

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
        },
      }}
      variant='persistent'
      anchor='right'>
      {open &&
        likedJokes!.map((joke) => (
          <Paper
            key={joke.id}
            elevation={6}
            sx={{ padding: '5px 2rem 5px 5px', marginBottom: '5px' }}
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
    </Drawer>
  );
};
