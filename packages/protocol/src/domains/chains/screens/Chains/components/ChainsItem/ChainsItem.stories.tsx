import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { mainTheme } from 'ui';
import chainLogo from 'modules/common/components/ChainMainInfo/assets/logo-mock.svg';
import { ChainsItem } from './ChainsItem';
import BigNumber from 'bignumber.js';

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
          totalRequests={chain.totalRequests.toString()}
          isLoading={chain.isLoading}
          logoSrc={chain.icon}
          name={chain.name}
          description="requestInforequestInforequestInforequestInfo"
          period="24h"
          links={chain.urls}
          chain={chain}
        />
      </Box>
    </ThemeProvider>
  </Router>
));
