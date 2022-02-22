import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { mainTheme } from 'modules/themes/mainTheme';
import { ChainNodesTable } from './ChainNodesTable';

export const data = [
  {
    blockchain: 'avalanche',
    city: 'Kuala Lumpur',
    continent: 'AS',
    country: 'MY',
    id: '6149ac01-8305-4534-b969-907700000000',
    isArchive: false,
    organization: 'ankr.com',
    scheme: 'web3',
  },
  {
    blockchain: 'avalanche',
    city: 'Kuala Lumpur',
    continent: 'AS',
    country: 'MY',
    id: '1ea5e511-696b-4209-ab87-015fa8b94c54',
    isArchive: false,
    organization: 'ankr.com',
    scheme: 'web3',
  },
];

export const nodesWeight = [
  {
    id: '1ea5e511-696b-4209-ab87-015fa8b94c54',
    weight: 10,
    latency: 1074,
    timestamp: 1640163255204,
    height: 13854027,
    height_timestamp: 1640163028849,
    score: 10,
  },
  {
    id: '60cb001d-6578-4e17-b875-147a00000000',
    weight: 26,
    latency: 573,
    timestamp: 1640163254703,
    height: 25690392,
    height_timestamp: 1640163028866,
    score: 10,
  },
  {
    id: '61167004-2667-4bf2-b515-bc2a00000000',
    weight: 0,
    latency: 465,
    timestamp: 1638722458872,
    height: 0,
    height_timestamp: 0,
    score: 10,
  },
  {
    id: '6149ac01-8305-4534-b969-907700000000',
    weight: 35,
    latency: 372,
    timestamp: 1640163254505,
    height: 8562344,
    height_timestamp: 1640163029711,
    score: 10,
  },
  {
    id: '614cb5db-5082-4175-a28e-0c2500000000',
    weight: 46,
    latency: 122,
    timestamp: 1640163254252,
    height: 101600083,
    height_timestamp: 1640163029284,
    score: 10,
  },
  {
    id: 'd05de3fc-8cdc-41e0-abbe-3976c2701320',
    weight: 10,
    latency: 1124,
    timestamp: 1640163255252,
    height: 10516995,
    height_timestamp: 1640163028915,
    score: 10,
  },
  {
    id: 'feaf18a8-9158-4e65-b312-da3eef27e7d3',
    weight: 10,
    latency: 1141,
    timestamp: 1640163255269,
    height: 55733292,
    height_timestamp: 1640163028918,
    score: 10,
  },
];

storiesOf('domains/chains/ChainNodesTable', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <ChainNodesTable
        nodesWeight={nodesWeight}
        // @ts-ignore
        data={data}
      />
    </ThemeProvider>
  </Box>
));
