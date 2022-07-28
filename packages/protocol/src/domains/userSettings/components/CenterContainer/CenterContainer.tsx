import { ReactNode } from 'react';

import { useStyles } from './CenterContainerStyles';

interface ICenterContainerProps {
  children: ReactNode;
}

export const CenterContainer = ({ children }: ICenterContainerProps) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};
