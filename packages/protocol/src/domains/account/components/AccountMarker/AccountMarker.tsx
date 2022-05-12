import React from 'react';

import { AccountMarkerProps as Props } from './types';
import { AccountStatus } from 'multirpc-sdk';
import { useStyles } from './AccountMarkerStyles';

export const AccountMarker = ({ status = AccountStatus.INACTIVE }: Props) => {
  const classes = useStyles({ status });

  return <div className={classes.accountMarkerRoot} />;
};
