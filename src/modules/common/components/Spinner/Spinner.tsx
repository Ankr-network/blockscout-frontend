import * as React from 'react';
import classNames from 'classnames';

import { useSpinnerStyles } from './SpinnerStyles';
import { ReactComponent as SpinnerIcon } from './assets/spinner.svg';

interface ISpinnerProps {
  centered?: boolean;
  className?: string;
  size?: number;
}

export const Spinner = ({
  centered = false,
  size,
  className = '',
}: ISpinnerProps) => {
  const classes = useSpinnerStyles({ size });

  return (
    <SpinnerIcon
      className={classNames(
        classes.component,
        centered && classes.centered,
        className,
      )}
    />
  );
};
