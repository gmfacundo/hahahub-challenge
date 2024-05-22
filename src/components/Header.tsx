import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function Header() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      paddingBottom={'4rem'}>
      <Image src='/logo.png' alt='Logo' width={400} height={225} />
    </Box>
  );
}
