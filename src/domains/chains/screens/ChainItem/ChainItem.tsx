import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import { mainTheme } from 'modules/themes/mainTheme';
import { ChainItemHeader } from './components/ChainItemHeader';
import { ChainItemDetails } from './components/ChainItemDetails';
import { ChainRequestsOverview } from './components/ChainRequestsOverview';
import { useStyles } from './ChainItemStyles';

export const ChainItem = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={mainTheme}>
      <div className={classes.root}>
        <div>
          <ChainItemHeader />
          <ChainRequestsOverview className={classes.overview} />
        </div>
        <ChainItemDetails />
      </div>
    </ThemeProvider>
  );
};
