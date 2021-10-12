import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { DetailsBlock } from './DetailsBlock';

storiesOf('domains/chains/DetailsBlock', module)
  .add('Default', () => (
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <DetailsBlock
          title="Average Requests/sec"
          subtitle="Last 24 Hours"
          value="9 321"
        >
          <div>changes</div>
        </DetailsBlock>
      </Box>
    </ThemeProvider>
  ))
  .add('Without children', () => (
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <DetailsBlock
          title="Average Requests/sec"
          subtitle="Last 24 Hours"
          value="9 321"
        />
      </Box>
    </ThemeProvider>
  ));
