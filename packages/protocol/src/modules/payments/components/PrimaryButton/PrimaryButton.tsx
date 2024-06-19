import { ButtonProps, ButtonOwnProps, LinkProps } from '@mui/material';
import { LoadingButton } from '@ankr.com/ui';
import { ReactNode } from 'react';

export interface IPrimaryButtonProps
  extends ButtonProps,
    Omit<ButtonOwnProps, 'classes'>,
    Pick<LinkProps, 'target'> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
}

export const PrimaryButton = ({ isLoading, ...props }: IPrimaryButtonProps) => {
  return (
    <LoadingButton
      {...props}
      fullWidth
      loading={isLoading}
      size="large"
      variant="contained"
    />
  );
};
