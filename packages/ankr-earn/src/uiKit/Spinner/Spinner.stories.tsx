import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from '../../themes/mainTheme';
import { Spinner } from './Spinner';

storiesOf('uiKit/Spinner', module)
  .add('Default', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Spinner />
      </ThemeProvider>
    </Box>
  ))
  .add('Centered false', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Spinner centered={false} />
      </ThemeProvider>
    </Box>
  ))
  .add('Size', () => (
    <Box margin="8" display="flex" justifyContent="space-around">
      <ThemeProvider theme={mainTheme}>
        <Spinner size={20} centered={false} />
        <Spinner size={30} centered={false} />
        <Spinner size={40} centered={false} />
        <Spinner size={50} centered={false} />
        <Spinner size={60} centered={false} />
      </ThemeProvider>
    </Box>
  ));
