import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { ButtonMetamask } from './ButtonMetamask';
import { mainTheme } from 'modules/themes/mainTheme';
import { polygonTheme } from 'modules/themes/polygonTheme';

storiesOf('uiKit/ButtonMetamask', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <ButtonMetamask onClick={() => null} />
    </ThemeProvider>
    <ThemeProvider theme={polygonTheme}>
      <ButtonMetamask onClick={() => null} />
    </ThemeProvider>
  </Box>
));
