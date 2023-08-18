import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { polygonTheme } from 'modules/themes/polygonTheme';
import { ChainId } from 'domains/chains/api/chain';

import { Header } from './Header';

storiesOf('modules/common/Header', module).add('polygonTheme', () => (
  <Box margin="8">
    <ThemeProvider theme={polygonTheme}>
      <Header chainId={ChainId.Polygon} />
    </ThemeProvider>
  </Box>
));
