import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import { darkTheme } from 'modules/themes/darkTheme';

export const Chains = () => {
  return <ThemeProvider theme={darkTheme}>Chains</ThemeProvider>;
};
