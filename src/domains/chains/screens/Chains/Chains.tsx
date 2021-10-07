import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import { mainTheme } from 'modules/themes/mainTheme';
import { useStyles } from './ChainsStyles';

export const Chains = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classes.chains} />
    </ThemeProvider>
  );
};
