import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { mainTheme } from 'modules/themes/mainTheme';
import chainLogo from 'modules/common/components/ChainMainInfo/assets/logo-mock.svg';
import { ChainsItem } from './ChainsItem';

const chain = {
  id: 'id',
  name: 'namenamenamename',
  icon: chainLogo,
  rpcLinks: ['chainLinkchainLinkchainLinkchainLinkchainLink'],
};

storiesOf('domains/chains/ChainsItem', module).add('Default', () => (
  <Router>
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <ChainsItem
          logoSrc={chain.icon}
          name={chain.name}
          description="requestInforequestInforequestInforequestInfo"
          period="24h"
          links={chain.rpcLinks}
          onButtonClick={() => null}
          chain={chain}
        />
      </Box>
    </ThemeProvider>
  </Router>
));
