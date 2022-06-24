import { ReactNode } from 'react';

import { useStakeFormStyles } from './useStakeFormStyles';

interface IStakeFormFooterProps {
  children: ReactNode;
}

export const StakeFormFooter = ({
  children,
}: IStakeFormFooterProps): JSX.Element => {
  const classes = useStakeFormStyles();

  return <div className={classes.footer}>{children}</div>;
};
