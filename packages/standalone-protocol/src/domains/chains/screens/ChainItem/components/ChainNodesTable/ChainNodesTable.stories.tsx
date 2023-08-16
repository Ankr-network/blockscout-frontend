import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { INodesDetailEntity } from 'multirpc-sdk';

import { mainTheme } from 'modules/themes/mainTheme';

import { ChainNodesTable } from './ChainNodesTable';

export const nodesDetail: INodesDetailEntity[] = [
  {
    name: 'name',
    id: '60cb001d-6578-4e17-b875-147a00000000',
    hasArchive: false,
    nodes: [
      {
        height: 13854027,
        score: 10,
        name: 'ankr.com',
        weight: 10,
        scheme: 'web3',
        location: {
          continent: 'AS',
          country: 'MY',
        },
      },
      {
        height: 25690392,
        score: 10,
        name: 'ankr.com',
        weight: 26,
        scheme: 'web3',
        location: {
          continent: 'AS',
          country: 'MY',
        },
      },
    ],
  },
];

storiesOf('domains/chains/ChainNodesTable', module).add('Default', () => (
  <Box margin="8">
    <ThemeProvider theme={mainTheme}>
      <ChainNodesTable nodesDetail={nodesDetail} />
    </ThemeProvider>
  </Box>
));
