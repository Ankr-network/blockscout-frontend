import classNames from 'classnames';
import { useStyles } from './useStyles';
import { StepIconProps } from '@material-ui/core';

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
