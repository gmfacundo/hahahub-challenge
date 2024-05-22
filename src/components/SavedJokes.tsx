import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Sidebar } from './Sidebar';
import SwipeableEdgeDrawer from './SwipeableDrawer';
import { LikedJokes, SetLikedJokes } from '@/context/types/Context';

export function SavedJokes({
  likedJokes,
  setLikedJokes,
}: {
  likedJokes: LikedJokes;
  setLikedJokes: SetLikedJokes;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); //750

  const open: boolean = likedJokes !== null && likedJokes.length > 0;
  return (
    <>
      {isMobile && open ? (
        <SwipeableEdgeDrawer
          likedJokes={likedJokes}
          setLikedJokes={setLikedJokes}
        />
      ) : (
        <Box component='nav'>
          <Sidebar likedJokes={likedJokes} setLikedJokes={setLikedJokes} />
        </Box>
      )}
    </>
  );
}
