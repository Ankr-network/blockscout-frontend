import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { storiesOf } from '@storybook/react';

import { ChainRequestsLabel } from './ChainRequestsLabel';
import { mainTheme } from 'uiKit/Theme/mainTheme';

storiesOf('domains/chains/ChainRequestsLabel', module)
  .add('Default', () => (
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <ChainRequestsLabel
          description="requestInforequestInforequestInforequestInfo"
          label="24h"
        />
      </Box>
    </ThemeProvider>
  ))
  .add('Description color', () => (
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <ChainRequestsLabel
          description="requestInforequestInforequestInforequestInfo"
          descriptionColor="textSecondary"
          label="24h"
        />
      </Box>
    </ThemeProvider>
  ));
