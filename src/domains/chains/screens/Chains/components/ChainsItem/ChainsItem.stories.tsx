import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { mainTheme } from 'modules/themes/mainTheme';
import chainLogo from 'modules/common/components/ChainMainInfo/assets/logo-mock.svg';
import { ChainsItem } from './ChainsItem';

storiesOf('domains/chains/ChainsItem', module).add('Default', () => (
  <Router>
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <ChainsItem
          logoSrc={chainLogo}
          name="namenamenamename"
          description="requestInforequestInforequestInforequestInfo"
          period="24h"
          links={['chainLinkchainLinkchainLinkchainLinkchainLink']}
          onButtonClick={() => null}
          hasWalletButton={false}
          isWalletConnectButtonActive={false}
          onNetworkAdd={() => null}
        />
      </Box>
    </ThemeProvider>
  </Router>
));
