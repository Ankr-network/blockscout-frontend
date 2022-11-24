import { t, tHTML } from '@ankr.com/common';
import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';

import { Button } from 'uiKit/Button';

import { useUnsupportedNetworkStyles } from './UnsupportedNetworkStyles';

export interface IUnsupportedNetwork {
  currentNetwork?: string;
  newNetwork: string;
  iconSlot: JSX.Element;
  isLoading?: boolean;
  onClick?: () => void;
}

export const UnsupportedNetwork = ({
  iconSlot,
  currentNetwork,
  newNetwork,
  isLoading = false,
  onClick,
}: IUnsupportedNetwork): JSX.Element => {
  const classes = useUnsupportedNetworkStyles();

  return (
    <Paper className={classes.paper}>
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

      <Button
        color="primary"
        disabled={isLoading}
        isLoading={isLoading}
        size="medium"
        style={{ width: '50%' }}
        onClick={onClick}
      >
        {t('connect.switch-network')}
      </Button>
    </Paper>
  );
};
