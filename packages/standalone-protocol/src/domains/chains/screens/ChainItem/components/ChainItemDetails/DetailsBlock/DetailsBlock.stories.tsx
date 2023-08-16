import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { polygonTheme } from 'modules/themes/polygonTheme';

import { DetailsBlock } from './DetailsBlock';

storiesOf('domains/chains/DetailsBlock', module)
  .add('Default', () => (
    <>
      <ThemeProvider theme={mainTheme}>
        <Box bgcolor="background.paper">
          <DetailsBlock
            title="Average Requests/sec"
            value="9 321"
            description="changes"
          />
        </Box>
        <ThemeProvider theme={polygonTheme}>
          <Box bgcolor="background.paper">
            <DetailsBlock
              title="Average Requests/sec"
              value="9 321"
              description="changes"
            />
          </Box>
        </ThemeProvider>
      </ThemeProvider>
    </>
  ))
  .add('Loading', () => (
    <ThemeProvider theme={mainTheme}>
      <Box bgcolor="background.paper">
        <DetailsBlock
          loading
          title="Average Requests/sec"
          value="9 321"
          description="changes"
        />
      </Box>
    </ThemeProvider>
  ));
