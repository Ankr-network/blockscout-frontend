import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';

import { mainTheme } from 'modules/themes/mainTheme';
import { polygonTheme } from 'modules/themes/polygonTheme';
import { Header } from './Header';
import { storiesOf } from '@storybook/react';

storiesOf('modules/common/Header', module)
  .add('Default', () => (
    <Box margin="8">
      <ThemeProvider theme={mainTheme}>
        <Header chainId="name" />
      </ThemeProvider>
    </Box>
  ))
  .add('polygonTheme', () => (
    <Box margin="8">
      <ThemeProvider theme={polygonTheme}>
        <Header chainId="name" />
      </ThemeProvider>
    </Box>
  ));
