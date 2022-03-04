import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'ui';
import { ChainBanner } from '.';

storiesOf('modules/common/SwipeBanner', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <ChainBanner />
    </ThemeProvider>
  </Box>
));
