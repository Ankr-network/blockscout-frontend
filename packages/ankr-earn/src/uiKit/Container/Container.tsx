import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { useContainerStyles } from './useContainerStyles';

export interface IContainerProps {
  className?: string;
  children?: ReactNode;
  maxWidth?: string;
}

export const Container = ({
  className,
  children,
  maxWidth,
}: IContainerProps): JSX.Element => {
  const classes = useContainerStyles({ maxWidth });

  return <div className={classNames(classes.root, className)}>{children}</div>;
};
