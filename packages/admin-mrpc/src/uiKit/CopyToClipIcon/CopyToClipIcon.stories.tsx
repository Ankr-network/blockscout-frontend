import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'ui';
import { CopyToClipIcon } from './CopyToClipIcon';

storiesOf('uiKit/CopyToClipIcon', module)
  .add('Default', () => (
    <Box margin="8">
      <ThemeProvider theme={mainTheme}>
        <CopyToClipIcon text="text" message="message" />
      </ThemeProvider>
    </Box>
  ))
  .add('With Copy Text', () => (
    <Box margin="8">
      <ThemeProvider theme={mainTheme}>
        <CopyToClipIcon text="text" message="message" copyText="copyText" />
      </ThemeProvider>
    </Box>
  ))
  .add('Sizes', () => (
    <Box margin="8">
      <ThemeProvider theme={mainTheme}>
        <Box m={2}>
          <Box m={2}> Size M</Box>
          <CopyToClipIcon
            size="medium"
            text="text"
            message="message"
            copyText="copyText"
          />
        </Box>
        <Box m={2}>
          <Box m={2}> Size L</Box>
          <CopyToClipIcon
            text="text"
            message="message"
            copyText="copyText"
            size="large"
          />
        </Box>
      </ThemeProvider>
    </Box>
  ))
  .add('With Custom Text Color', () => (
    <Box margin="8">
      <ThemeProvider theme={mainTheme}>
        <CopyToClipIcon
          text="text"
          textColor="textPrimary"
          message="message"
          copyText="copyText"
          size="large"
        />
      </ThemeProvider>
    </Box>
  ));
