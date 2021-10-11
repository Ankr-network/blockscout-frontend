import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { ChainMainInfo } from './ChainMainInfo';
import chainLogo from './assets/logo-mock.svg';

storiesOf('domains/chains/ChainMainInfo', module)
  .add('Default', () => (
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <ChainMainInfo
          logoSrc={chainLogo}
          name="namenamenamename"
          description="requestInforequestInforequestInforequestInfo"
          label="24h"
        />
      </Box>
    </ThemeProvider>
  ))
  .add('Without label', () => (
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <ChainMainInfo
          logoSrc={chainLogo}
          name="namenamenamename"
          description="requestInforequestInforequestInforequestInfo"
        />
      </Box>
    </ThemeProvider>
  ));
