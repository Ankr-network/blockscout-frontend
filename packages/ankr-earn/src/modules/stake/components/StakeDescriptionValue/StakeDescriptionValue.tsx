import { Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { useStakeDescriptionValueStyles } from './StakeDescriptionValueStyles';

export interface IStakeDescriptionValueProps {
  children: ReactNode;
}

export const StakeDescriptionValue = ({
  children,
}: IStakeDescriptionValueProps) => {
  const classes = useStakeDescriptionValueStyles();

  return (
    <Typography variant="h5" component="div" classes={{ root: classes.root }}>
      {children}
    </Typography>
  );
};
