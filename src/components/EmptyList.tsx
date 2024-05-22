import { Box, Typography, useTheme } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export function EmptyList() {
  const theme = useTheme();

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'>
      <SearchOffIcon
        sx={{ color: theme.palette.primary.dark, fontSize: '10rem' }}
      />
      <Typography
        sx={{ color: theme.palette.primary.dark, fontSize: '2rem' }}>
        Can&apos;t find any jokes
      </Typography>
    </Box>
  );
}
