import { Box, styled, useTheme } from '@mui/material';

function SwipePuller() {
  const theme = useTheme();

  const Puller = styled('div')(({ theme }) => ({
    width: 150,
    height: 6,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 75px)',
  }));

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        top: -30,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        visibility: 'visible',
        right: 0,
        left: 0,
      }}>
      <Puller />
      <Box p={2} />
    </Box>
  );
}

export default SwipePuller;
