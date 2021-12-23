import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'ui';
import { Chart, IChartData } from './Chart';

const date = new Date();

const data: IChartData[] = [
  {
    time: date,
    value: 0,
  },
  {
    time: date,
    value: 1,
  },
  {
    time: date,
    value: 2,
  },
  {
    time: date,
    value: 1.5,
  },
  {
    time: date,
    value: 0,
  },
];

storiesOf('modules/common/Chart', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <Chart data={data} />
    </ThemeProvider>
  </Box>
));
