import { Paper, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { tHTML } from 'modules/i18n/utils/intl';

import { useUnsupportedNetworkStyles } from './UnsupportedNetworkStyles';

export interface IUnsupportedNetwork {
  networksSlot?: ReactNode;
  currentNetwork: string;
}

export const UnsupportedNetwork = ({
  networksSlot,
  currentNetwork,
}: IUnsupportedNetwork): JSX.Element => {
  const classes = useUnsupportedNetworkStyles();

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.header} variant="h5">
        {tHTML('connect.unsupported-network', {
          network: currentNetwork,
        })}
      </Typography>

      {networksSlot}
    </Paper>
  );
};
