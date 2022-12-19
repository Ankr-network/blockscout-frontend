import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';

import { CopyToClipButton } from './CopyToClipButton';

import { mainTheme } from 'modules/themes/mainTheme';
import { polygonTheme } from 'modules/themes/polygonTheme';
import { storiesOf } from '@storybook/react';

storiesOf('uiKit/CopyToClipButton', module)
  .add('Default', () => (
    <Box margin="8">
      <ThemeProvider theme={mainTheme}>
        <CopyToClipButton
          text="text"
          textMessage="textMessage"
          buttonText="buttonText"
        />
      </ThemeProvider>
    </Box>
  ))
  .add('Polygon', () => (
    <Box margin="8">
      <ThemeProvider theme={polygonTheme}>
        <CopyToClipButton
          text="text"
          textMessage="textMessage"
          buttonText="buttonText"
        />
      </ThemeProvider>
    </Box>
  ));
