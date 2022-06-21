import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import { FormEventHandler, ReactNode } from 'react';

import { useStakeFormStyles } from './useStakeFormStyles';

interface IStakeFormBoxProps {
  children: ReactNode;
  className?: string;
  onSubmit?: FormEventHandler<HTMLDivElement>;
}

export const StakeFormBox = ({
  children,
  className,
  onSubmit,
}: IStakeFormBoxProps): JSX.Element => {
  const classes = useStakeFormStyles();

  return (
    <Paper
      className={classNames(className, classes.box)}
      component="form"
      onSubmit={onSubmit}
    >
      {children}
    </Paper>
  );
};
