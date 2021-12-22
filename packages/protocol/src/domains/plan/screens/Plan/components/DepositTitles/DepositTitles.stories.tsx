import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'ui';

import { DepositTitles } from './DepositTitles';

storiesOf('domains/plan/DepositTitles', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <DepositTitles topTitle="topTitle" bottomTitle="bottomTitle" />
    </ThemeProvider>
  </Box>
));
