import { t, tHTML } from '@ankr.com/common';
import { Box, Paper, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { useUnsupportedNetworkStyles } from './UnsupportedNetworkStyles';

export interface IUnsupportedNetwork {
  singleSwitcher: boolean;
  networksSlot?: ReactNode;
  currentNetwork?: string;
  newNetwork: string | null;
  iconSlot: JSX.Element | null;
}

export const UnsupportedNetwork = ({
  iconSlot,
  singleSwitcher,
  networksSlot,
  currentNetwork,
  newNetwork,
}: IUnsupportedNetwork): JSX.Element => {
  const classes = useUnsupportedNetworkStyles();

  return (
    <Paper className={classes.paper}>
      {singleSwitcher && iconSlot ? (
        <>
          <Typography className={classes.header} variant="h3">
            {t('connect.unsupported-network-header')}
          </Typography>

          <Typography className={classes.description} variant="h5">
            {t('connect.unsupported-network-single-description', {
              currentNetwork,
            })}
          </Typography>

          <Box display="flex">
            <Typography className={classes.description} variant="h5">
              {t('connect.unsupported-network-single-switch')}
            </Typography>

            {React.cloneElement(iconSlot, {
              className: classes.icon,
            })}

            <Typography className={classes.description} variant="h5">
              {tHTML('connect.unsupported-network-single-network', {
                newNetwork,
              })}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography className={classes.header} variant="h3">
            {t('connect.unsupported-network-header')}
          </Typography>

          <Typography className={classes.description} variant="h5">
            {t('connect.unsupported-network-description')}
          </Typography>
        </>
      )}

      {networksSlot}
    </Paper>
  );
};
