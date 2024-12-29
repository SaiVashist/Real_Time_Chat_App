import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, TextField, Button } from '@mui/material';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6A0572', // Primary color
    },
    secondary: {
      main: '#ffffff', // Secondary color (white)
    },
    background: {
      default: '#ffffff', // White background
    },
    text: {
      primary: '#6A0572', // Text color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Optional: Set font family
  },
});
export default theme;
