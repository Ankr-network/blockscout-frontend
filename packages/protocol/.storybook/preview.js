import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@mui/material';
import { mainTheme } from '../src/modules/themes/mainTheme';
import '../src/assets/fonts/style.css';

export const decorators = [
  Story => (
    <MuiThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Story />
    </MuiThemeProvider>
  ),
];
