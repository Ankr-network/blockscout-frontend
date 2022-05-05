import { Paper, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { tHTML } from 'common';

import { useUnsupportedNetworkStyles } from './UnsupportedNetworkStyles';

export interface IUnsupportedNetwork {
  currentNetwork?: string;
  infoTxt?: string;
  networksSlot?: ReactNode;
}

export const UnsupportedNetwork = ({
  currentNetwork,
  infoTxt,
  networksSlot,
}: IUnsupportedNetwork): JSX.Element => {
  const classes = useUnsupportedNetworkStyles();

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.header} variant="h5">
        {typeof infoTxt === 'string'
          ? infoTxt
          : tHTML('connect.unsupported-network', {
              network: currentNetwork,
            })}
      </Typography>

      {networksSlot}
    </Paper>
  );
};
