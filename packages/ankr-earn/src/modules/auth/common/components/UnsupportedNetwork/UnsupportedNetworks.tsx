import { t } from '@ankr.com/common';
import { Paper, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import { NetworkSelector } from '../NetworkSelector';

import { useUnsupportedNetworkStyles } from './UnsupportedNetworkStyles';

interface IUnsupportedNetworksProps {
  children: ReactNode;
  isLoading?: boolean;
}

export const UnsupportedNetworks = ({
  children,
  isLoading = false,
}: IUnsupportedNetworksProps): JSX.Element => {
  const classes = useUnsupportedNetworkStyles();

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.header} variant="h3">
        {t('connect.unsupported-network-header')}
      </Typography>

      <Typography className={classes.description} variant="h5">
        {t('connect.unsupported-network-description')}
      </Typography>

      {isLoading ? (
        <QueryLoadingCentered />
      ) : (
        <NetworkSelector direction="column">{children}</NetworkSelector>
      )}
    </Paper>
  );
};
