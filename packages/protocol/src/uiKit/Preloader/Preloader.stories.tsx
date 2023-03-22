import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'uiKit/Theme/mainTheme';
import { Preloader } from './Preloader';

storiesOf('uiKit/Preloader', module)
  .add('Default', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Preloader />
      </ThemeProvider>
    </Box>
  ))
  .add('Centered', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Preloader centered />
      </ThemeProvider>
    </Box>
  ))
  .add('Size', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Preloader size={10} />
        <Preloader size={20} />
      </ThemeProvider>
    </Box>
  ));