import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'uiKit/Theme/mainTheme';

import { ChainMainInfo } from './ChainMainInfo';

storiesOf('domains/chains/ChainMainInfo', module).add('Default', () => (
  <ThemeProvider theme={mainTheme}>
    <Box padding={4} bgcolor="background.paper">
      <ChainMainInfo
        logoSrc="https://www.ankr.com/rpc/static/media/eth.3ee8ddd4.svg"
        name="namenamenamename"
        description={<div>description</div>}
      />
    </Box>
  </ThemeProvider>
));
