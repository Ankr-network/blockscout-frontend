import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { solanaTheme } from 'modules/themes/solanaTheme';
import { polygonTheme } from 'modules/themes/polygonTheme';
import { Header } from './Header';

storiesOf('modules/common/Header', module)
  .add('Default', () => (
    <Box margin="8">
      <ThemeProvider theme={mainTheme}>
        <Header chainId="name" />
      </ThemeProvider>
    </Box>
  ))
  .add('solanaTheme', () => (
    <Box margin="8" style={{ backgroundColor: '#000' }}>
      <ThemeProvider theme={solanaTheme}>
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
