import { Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { useStakeTermStyles } from './StakeDescriptionNameStyles';

export interface IStakeDescriptionNameProps {
  children: ReactNode;
}

export const StakeDescriptionName = ({
  children,
}: IStakeDescriptionNameProps): JSX.Element => {
  const classes = useStakeTermStyles();

  return <Typography classes={{ root: classes.root }}>{children}</Typography>;
};
