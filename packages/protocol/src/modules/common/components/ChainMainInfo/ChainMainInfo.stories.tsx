import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'uiKit/Theme/mainTheme';
import { ChainMainInfo } from './ChainMainInfo';
import chainLogo from './assets/logo-mock.svg';

storiesOf('domains/chains/ChainMainInfo', module).add('Default', () => (
  <ThemeProvider theme={mainTheme}>
    <Box padding={4} bgcolor="background.paper">
      <ChainMainInfo
        logoSrc={chainLogo}
        name="namenamenamename"
        description={<div>description</div>}
      />
    </Box>
  </ThemeProvider>
));
