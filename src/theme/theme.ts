'use client';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F97242',
      light: '#FECCA7',
      dark: '#8F3C1E',
    },
  },
  breakpoints: {
    values: {
      xs: 360,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;

// #F97242
// #FECCA7
// #8F3C1E

// #F34D11

// Revisar #F34D11
