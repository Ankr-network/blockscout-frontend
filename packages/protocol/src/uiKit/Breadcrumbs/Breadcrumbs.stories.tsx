import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { mainTheme } from 'uiKit/Theme/mainTheme';

import { Breadcrumbs } from './Breadcrumbs';
import { UserLabel } from './Components/UserLabel';

const items = [{ title: 'Chains', link: '/' }, { title: 'Polygon' }];

storiesOf('uiKit/Breadcrumbs', module).add('Default', () => (
  <Box margin="8">
    <Router>
      <ThemeProvider theme={mainTheme}>
        <Breadcrumbs items={items} userLabel={<UserLabel />} />
      </ThemeProvider>
    </Router>
  </Box>
));
