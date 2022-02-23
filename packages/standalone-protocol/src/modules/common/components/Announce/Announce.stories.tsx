import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { Announce } from './Announce';

storiesOf('modules/common/Announce', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <Announce name="rpc.sol.tools" link="#" />
    </ThemeProvider>
  </Box>
));
