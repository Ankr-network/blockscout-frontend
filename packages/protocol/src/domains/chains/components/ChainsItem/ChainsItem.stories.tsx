import { BlockchainType } from 'multirpc-sdk';
import { Box, ThemeProvider } from '@mui/material';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import BigNumber from 'bignumber.js';
import { Timeframe } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import { mainTheme } from 'uiKit/Theme/mainTheme';
import { ChainsItem } from './ChainsItem';

const chain = {
  icon: 'https://www.ankr.com/rpc/static/media/eth.3ee8ddd4.svg',
  id: 'id' as ChainID,
  isLoading: false,
  name: 'namenamenamename',
  totalRequests: new BigNumber(10000),
  type: BlockchainType.Mainnet,
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
          hasPrivateAccess={false}
          links={chain.urls}
          logoSrc={chain.icon}
          name={chain.name}
          period="24h"
          timeframe={Timeframe.Month}
          totalRequests={chain.totalRequests.toString()}
          urls={chain.urls}
          dummyMessage="111"
        />
      </Box>
    </ThemeProvider>
  </Router>
));
