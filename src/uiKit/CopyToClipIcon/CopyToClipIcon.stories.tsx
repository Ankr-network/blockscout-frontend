import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { CopyToClipIcon } from './CopyToClipIcon';

storiesOf('components/CopyToClipIcon', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <CopyToClipIcon text="text" message="message" />
    </ThemeProvider>
  </Box>
));
