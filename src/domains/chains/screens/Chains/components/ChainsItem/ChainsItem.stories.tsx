import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { mainTheme } from 'modules/themes/mainTheme';
import { ChainsItem } from './ChainsItem';
import chainLogo from './assets/logo-mock.svg';

storiesOf('domains/chains/ChainsItem', module).add('Default', () => (
  <Router>
    <ThemeProvider theme={mainTheme}>
      <Box padding={4} bgcolor="background.paper">
        <ChainsItem
          logoSrc={chainLogo}
          name="namenamenamename"
          requestInfo="requestInforequestInforequestInforequestInfo"
          period="24h"
          chainLink="chainLinkchainLinkchainLinkchainLinkchainLink"
          chainDetailsLink="chainDetailsLink"
        />
      </Box>
    </ThemeProvider>
  </Router>
));
