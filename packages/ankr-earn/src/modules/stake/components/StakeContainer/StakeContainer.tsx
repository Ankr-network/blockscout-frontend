import { Container, ContainerProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useStakeContainerStyles } from './useStakeContainerStyles';

interface IStakeContainerProps extends ContainerProps {}

export const StakeContainer = ({
  className,
  ...restContainerProps
}: IStakeContainerProps) => {
  const classes = useStakeContainerStyles();

  return (
    <Container
      {...restContainerProps}
      className={classNames(classes.root, className)}
    />
  );
};
