import React from 'react';

import { AccountStatus } from 'multirpc-sdk';
import { useStyles } from './AccountMarkerStyles';

export interface AccountMarkerProps {
  status?: AccountStatus;
}

export const AccountMarker = ({
  status = AccountStatus.INACTIVE,
}: AccountMarkerProps) => {
  const classes = useStyles(status || AccountStatus.INACTIVE);

  return <div className={classes.accountMarkerRoot} />;
};
