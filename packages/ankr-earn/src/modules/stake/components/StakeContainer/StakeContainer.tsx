import classNames from 'classnames';
import React from 'react';
import { Container, IContainerProps } from 'uiKit/Container';
import { useStakeContainerStyles } from './useStakeContainerStyles';

export const StakeContainer = ({
  className,
  ...restContainerProps
}: IContainerProps) => {
  const classes = useStakeContainerStyles();

  return (
    <Container
      {...restContainerProps}
      className={classNames(classes.root, className)}
    />
  );
};
