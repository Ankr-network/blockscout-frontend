import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'uiKit/Theme/mainTheme';
import { CopyToClipButton } from './CopyToClipButton';

storiesOf('uiKit/CopyToClipButton', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <CopyToClipButton
        text="text"
        textMessage="textMessage"
        buttonText="buttonText"
      />
    </ThemeProvider>
  </Box>
));
