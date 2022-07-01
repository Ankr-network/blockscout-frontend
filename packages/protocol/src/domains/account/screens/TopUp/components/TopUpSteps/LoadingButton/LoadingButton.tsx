import React, { ReactNode } from 'react';
import { Button, CircularProgress } from '@material-ui/core';

interface ILoadingButtonProps {
  onClick: () => void;
  loading: boolean;
  isDisabled: boolean;
  children: ReactNode;
  className?: string;
}

export const LoadingButton = ({
  onClick,
  isDisabled,
  loading,
  children,
  className,
}: ILoadingButtonProps) => {
  return (
    <Button
      className={className}
      disabled={isDisabled}
      onClick={onClick}
      startIcon={
        loading ? <CircularProgress size={18} color="inherit" /> : null
      }
    >
      {children}
    </Button>
  );
};
