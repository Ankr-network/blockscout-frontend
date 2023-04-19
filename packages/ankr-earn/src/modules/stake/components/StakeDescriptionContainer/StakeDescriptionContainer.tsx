import { ReactNode } from 'react';

import { useStakeDescriptionContainerStyles } from './StakeDescriptionContainerStyles';

export interface IStakeDescriptionContainerProps {
  children: ReactNode;
}

export const StakeDescriptionContainer = ({
  children,
}: IStakeDescriptionContainerProps): JSX.Element => {
  const classes = useStakeDescriptionContainerStyles();

  return <div className={classes.root}>{children}</div>;
};