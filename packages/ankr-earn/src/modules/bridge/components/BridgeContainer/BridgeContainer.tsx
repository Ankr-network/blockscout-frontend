import classNames from 'classnames';
import React from 'react';

import { Container, IContainerProps } from 'uiKit/Container';

import { useBridgeContainerStyles } from './useBridgeContainerStyles';

export const BridgeContainer = ({
  className,
  ...restContainerProps
}: IContainerProps): JSX.Element => {
  const classes = useBridgeContainerStyles();

  return (
    <Container
      {...restContainerProps}
      className={classNames(classes.root, className)}
    />
  );
};
