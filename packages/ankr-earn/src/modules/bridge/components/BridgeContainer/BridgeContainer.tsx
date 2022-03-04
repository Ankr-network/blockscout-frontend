import classNames from 'classnames';

import { Container, IContainerProps } from 'uiKit/Container';

import { useBridgeContainerStyles } from './useBridgeContainerStyles';

export const BridgeContainer = ({
  className,
  ...restContainerProps
}: Omit<IContainerProps, 'maxWidth'>): JSX.Element => {
  const classes = useBridgeContainerStyles();

  return (
    <Container
      {...restContainerProps}
      className={classNames(classes.root, className)}
      maxWidth="780px"
    />
  );
};
