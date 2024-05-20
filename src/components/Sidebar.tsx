'use client';

import { Drawer, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppContextType } from '@/context/types/Context';
import ContextInterface from '@/interfaces/ContextInterface';
import { useRouter } from 'next/navigation';

export const Sidebar = (props: AppContextType) => {
  const { likedJokes, setLikedJokes } = props;
  const router = useRouter();

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

  const handleClick = (jokeId: string) => {
    router.push(`/?joke=${jokeId}`);
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
          backgroundColor: '#F97242',
          borderLeft: '1px solid #8F3C1E',
          padding: '5px',
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
            }}
            onClick={() => handleClick(joke.id)}>
            <Typography variant='body2'>{joke.joke}</Typography>
            <IconButton
              onClick={(e) => handleDelete(e, joke.id)}
              style={{
                position: 'absolute',
                top: '1px',
                right: '1px',
                padding: '4px',
              }}>
              <DeleteIcon fontSize='medium' style={{ color: '#666668' }} />
            </IconButton>
          </Paper>
        ))}
    </Drawer>
  );
};
