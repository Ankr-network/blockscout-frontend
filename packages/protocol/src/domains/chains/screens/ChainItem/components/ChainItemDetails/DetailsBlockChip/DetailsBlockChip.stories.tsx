import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'ui';
import { DetailsBlockChip } from './DetailsBlockChip';

storiesOf('domains/chains/DetailsBlockChip', module)
  .add('Default', () => (
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <DetailsBlockChip label="20%" />
      </Box>
    </ThemeProvider>
  ))
  .add('Negative', () => (
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <DetailsBlockChip type="negative" label="20%" />
      </Box>
    </ThemeProvider>
  ));
