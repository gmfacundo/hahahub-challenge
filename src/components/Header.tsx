import React from 'react';
import { Box } from '@mui/material';

export default function Header() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{ paddingBottom: '4rem' }}>
      <img src='/logo.png' alt='Logo' style={{ width: '25rem' }} />
    </Box>
  );
}
