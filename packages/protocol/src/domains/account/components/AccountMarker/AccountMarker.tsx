import React from 'react';

import { AccountMarkerProps as Props } from './types';
import { BalanceStatus } from 'domains/account/types';
import { useStyles } from './AccountMarkerStyles';

export const AccountMarker = ({ status = BalanceStatus.RED }: Props) => {
  const classes = useStyles({ status });

  return <div className={classes.accountMarkerRoot} />;
};
