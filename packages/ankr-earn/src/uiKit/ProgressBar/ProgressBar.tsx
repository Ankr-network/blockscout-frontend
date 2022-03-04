import { LinearProgress, LinearProgressProps } from '@material-ui/core';
import classNames from 'classnames';

import { useProgressBarStyles } from './useProgressBarStyles';

export interface IProgressBarProps
  extends Omit<LinearProgressProps, 'variant'> {}

export const ProgressBar = ({
  className,
  ...restProps
}: IProgressBarProps): JSX.Element => {
  const classes = useProgressBarStyles();

  return (
    <LinearProgress
      {...restProps}
      className={classNames(classes.root, className)}
      variant="determinate"
    />
  );
};
