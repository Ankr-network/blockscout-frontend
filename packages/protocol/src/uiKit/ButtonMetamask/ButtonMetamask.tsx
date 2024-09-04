import React, { ReactNode, useCallback } from 'react';
import { Button } from '@mui/material';
import { MetaMaskWallet } from '@ankr.com/ui';

import { useButtonMetamaskStyles } from './ButtonMetamaskStyles';

interface ButtonMetamaskProps {
  className?: string;
  isDisabled?: boolean;
  label?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  size?: 'large' | 'medium' | 'small';
}

export const ButtonMetamask = ({
  className = '',
  isDisabled,
  label,
  onClick,
  size = 'large',
}: ButtonMetamaskProps) => {
  const { classes, cx } = useButtonMetamaskStyles();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.preventDefault();
      onClick?.(event);
    },
    [onClick],
  );

  return (
    <Button
      disabled={isDisabled}
      className={cx(classes.button, className)}
      size={size}
      onClick={handleClick}
    >
      <MetaMaskWallet className={classes.icon} />
      {label}
    </Button>
  );
};
