import { Box, ThemeProvider } from '@material-ui/core';

import { polygonTheme } from 'modules/themes/polygonTheme';
import { Header } from './Header';
import { storiesOf } from '@storybook/react';
import { ChainId } from 'domains/chains/api/chain';

storiesOf('modules/common/Header', module).add('polygonTheme', () => (
  <Box margin="8">
    <ThemeProvider theme={polygonTheme}>
      <Header chainId={ChainId.Polygon} />
    </ThemeProvider>
  </Box>
));
