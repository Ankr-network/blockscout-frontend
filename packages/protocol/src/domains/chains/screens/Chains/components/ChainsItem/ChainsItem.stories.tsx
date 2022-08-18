import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { mainTheme } from 'ui';
import chainLogo from 'modules/common/components/ChainMainInfo/assets/logo-mock.svg';
import { ChainsItem } from './ChainsItem';
import BigNumber from 'bignumber.js';
import { StatsTimeframe } from 'domains/chains/types';

const chain = {
  isLoading: false,
  totalRequests: new BigNumber(10000),
  id: 'id',
  name: 'namenamenamename',
  icon: chainLogo,
  urls: [{ rpc: 'chainLinkchainLinkchainLinkchainLinkchainLink' }],
};

storiesOf('domains/chains/ChainsItem', module).add('Default', () => (
  <Router>
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <ChainsItem
          chain={chain}
          description="requestInforequestInforequestInforequestInfo"
          isLoading={chain.isLoading}
          isPremium={false}
          links={chain.urls}
          logoSrc={chain.icon}
          name={chain.name}
          period="24h"
          statsTimeframe={StatsTimeframe.MONTH}
          totalRequests={chain.totalRequests.toString()}
        />
      </Box>
    </ThemeProvider>
  </Router>
));
