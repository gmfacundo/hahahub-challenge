import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'>
      <Avatar
        alt='App Logo'
        src='/logo.png'
        sx={{ width: 56, height: 56, mb: 2 }}
      />
      <Typography variant='h5'>HaHaHub</Typography>
    </Box>
  );
}
