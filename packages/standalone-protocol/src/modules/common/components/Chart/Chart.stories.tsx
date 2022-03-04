import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { Chart } from './Chart';

const series = [
  {
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  },
];

storiesOf('modules/common/Chart', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <Chart series={series} xValues={[]} hasGradient />
    </ThemeProvider>
  </Box>
));
