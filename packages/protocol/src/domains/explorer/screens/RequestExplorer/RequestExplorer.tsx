import React from 'react';
import { ThemeProvider, Box } from '@material-ui/core';

import { mainTheme } from 'ui';
import { t } from 'modules/i18n/utils/intl';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ExplorerRoutesConfig } from 'domains/explorer/Routes';

import { useStyles } from './RequestExplorerStyles';
import { RequestExplorerTableQuery } from './RequestExplorerTableQuery';

export const RequestExplorer = () => {
  const classes = useStyles();

  useSetBreadcrumbs([
    {
      title: t(ExplorerRoutesConfig.requestExplorer.breadcrumbs),
    },
  ]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Box className={classes.root}>
        <RequestExplorerTableQuery />
      </Box>
    </ThemeProvider>
  );
};
