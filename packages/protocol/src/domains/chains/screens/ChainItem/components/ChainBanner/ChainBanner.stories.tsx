import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'uiKit/Theme/mainTheme';
import { ChainBanner } from '.';

storiesOf('modules/common/SwipeBanner', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <ChainBanner />
    </ThemeProvider>
  </Box>
));
