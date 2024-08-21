import React, { ReactNode } from 'react';
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

  return (
    <Button
      disabled={isDisabled}
      className={cx(classes.button, className)}
      size={size}
      onClick={onClick}
    >
      <MetaMaskWallet className={classes.icon} />
      {label}
    </Button>
  );
};
