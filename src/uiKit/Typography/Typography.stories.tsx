import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { Typography } from './Typography';

storiesOf('uiKit/Typography', module).add('Default', () => (
  <Box>
    <ThemeProvider theme={mainTheme}>
      <Box m={2}>
        <Typography variant="h1">variant h1</Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h2">variant h2</Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h3">variant h3</Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h4">variant h4</Typography>
      </Box>
      <Box m={2}>
        <Typography variant="h5">variant h5</Typography>
      </Box>
      <Box m={2}>
        <Typography variant="body1">variant body1</Typography>
      </Box>
      <Box m={2}>
        <Typography variant="body2">variant body2</Typography>
      </Box>
      <Box m={2}>
        <Typography variant="subtitle1">variant subtitle 1</Typography>
      </Box>
      <Box m={2}>
        <Typography variant="subtitle2">variant subtitle 2</Typography>
      </Box>
    </ThemeProvider>
  </Box>
));
