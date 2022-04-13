import React from 'react';

import { AccountStatus as Status } from 'modules/account/types';
import { useStyles } from './AccountMarkerStyles';

export interface AccountMarkerProps {
  status?: Status;
}

export const AccountMarker = ({
  status = Status.GREEN,
}: AccountMarkerProps) => {
  const classes = useStyles(status);

  return <div className={classes.accountMarkerRoot} />;
};
