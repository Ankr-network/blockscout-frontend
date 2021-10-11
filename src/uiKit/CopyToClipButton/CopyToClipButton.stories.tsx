import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { CopyToClipButton } from './CopyToClipButton';

storiesOf('uiKit/CopyToClipButton', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <CopyToClipButton
        text="text"
        textMessage="textMessage"
        buttonText="buttonText"
        buttonMessage="buttonMessage"
      />
    </ThemeProvider>
  </Box>
));
