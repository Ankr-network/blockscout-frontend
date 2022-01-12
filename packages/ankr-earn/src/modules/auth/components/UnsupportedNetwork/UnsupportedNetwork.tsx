import { Paper, Typography } from '@material-ui/core';
import { tHTML } from 'modules/i18n/utils/intl';
import React, { ReactNode } from 'react';
import { useUnsupportedNetworkStyles } from './UnsupportedNetworkStyles';

export interface IUnsupportedNetwork {
  networksSlot?: ReactNode;
  currentNetwork: string;
}

export const UnsupportedNetwork = ({
  networksSlot,
  currentNetwork,
}: IUnsupportedNetwork) => {
  const classes = useUnsupportedNetworkStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.header}>
        {tHTML('connect.unsupported-network', {
          network: currentNetwork,
        })}
      </Typography>

      {networksSlot}
    </Paper>
  );
};
