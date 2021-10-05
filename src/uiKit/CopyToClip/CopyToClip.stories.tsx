import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { CopyToClip } from './CopyToClip';

storiesOf('components/CopyToClip', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <CopyToClip text="text" message="message" />
    </ThemeProvider>
  </Box>
));
