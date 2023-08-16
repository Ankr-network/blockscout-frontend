import classNames from 'classnames';
import { StepIconProps } from '@material-ui/core';

import { useStyles } from './useStyles';

export function StepIcon({ active, completed }: StepIconProps) {
  const classes = useStyles();

  return (
    <div
      className={classNames(
        classes.icon,
        (active || completed) && classes.active,
      )}
    />
  );
}
