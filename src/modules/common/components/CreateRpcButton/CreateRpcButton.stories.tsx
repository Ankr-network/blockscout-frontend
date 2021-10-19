import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { CreateRpcButton } from './CreateRpcButton';

storiesOf('modules/common/CreateRpcButton', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <CreateRpcButton />
    </ThemeProvider>
  </Box>
));
