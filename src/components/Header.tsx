import React from 'react';
import { Box, useTheme } from '@mui/material';
import Image from 'next/image';

export default function Header() {
  const theme = useTheme();

  const isXs = theme.breakpoints.down('xs');

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      paddingBottom={'4rem'}>
      {isXs ? (
        <Image src='/logo.png' alt='Logo' width={300} height={169} />
      ) : (
        <Image src='/logo.png' alt='Logo' width={400} height={225} />
      )}
    </Box>
  );
}
