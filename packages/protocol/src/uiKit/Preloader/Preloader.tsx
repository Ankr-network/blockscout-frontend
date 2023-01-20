import React from 'react';

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
  const { classes, cx } = useStyles({ size });

  return (
    <div className={cx(classes.root, centered && classes.centered, className)}>
      <div className={classes.circle} />
      <div className={cx(classes.circle, classes.circle2)} />
      <div className={cx(classes.circle, classes.circle3)} />
    </div>
  );
};
