import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import intl from 'react-intl-universal';

import { mainTheme } from '../src/modules/themes/mainTheme';
import '../src/assets/fonts/style.css';
import { locales } from '../src/modules/i18n';

intl.init({
  currentLocale: 'en-US',
  locales,
});

export const decorators = [
  Story => (
    <MuiThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Story />
    </MuiThemeProvider>
  ),
];
