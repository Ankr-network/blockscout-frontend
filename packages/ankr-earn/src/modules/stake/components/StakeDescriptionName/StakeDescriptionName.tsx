import React, { ReactNode } from 'react';
import { useStakeTermStyles } from './StakeDescriptionNameStyles';
import { Typography } from '@material-ui/core';

export interface IStakeDescriptionNameProps {
  children: ReactNode;
}

export const StakeDescriptionName = ({
  children,
}: IStakeDescriptionNameProps) => {
  const classes = useStakeTermStyles();

  return <Typography classes={{ root: classes.root }}>{children}</Typography>;
};
