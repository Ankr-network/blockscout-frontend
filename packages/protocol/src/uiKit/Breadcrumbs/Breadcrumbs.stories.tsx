import React from 'react';
import { Box, ThemeProvider } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { mainTheme } from 'ui';
import { Breadcrumbs } from './Breadcrumbs';

const items = [{ title: 'Chains', link: '/' }, { title: 'Polygon' }];

storiesOf('uiKit/Breadcrumbs', module).add('Default', () => (
  <Box margin="8">
    <Router>
      <ThemeProvider theme={mainTheme}>
        <Breadcrumbs items={items} />
      </ThemeProvider>
    </Router>
  </Box>
));
