import React from 'react';
import classNames from 'classnames';

import { useStyles } from './useStyles';

interface IPreloaderProps {
  size?: number;
  centered?: boolean;
  className?: string;
}

const DEFAULT_SIZE = 5;

export const Preloader = ({
  size = DEFAULT_SIZE,
  centered = false,
  className = '',
}: IPreloaderProps) => {
  const classes = useStyles({ size });

  return (
    <div
      className={classNames(
        classes.root,
        centered && classes.centered,
        className,
      )}
    >
      <div className={classes.circle} />
      <div className={classNames(classes.circle, classes.circle2)} />
      <div className={classNames(classes.circle, classes.circle3)} />
    </div>
  );
};
