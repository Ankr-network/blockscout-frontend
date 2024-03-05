import { LoadingButton } from '@ankr.com/ui';
import { ReactNode } from 'react';

export interface IPrimaryButtonProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick: () => void;
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
