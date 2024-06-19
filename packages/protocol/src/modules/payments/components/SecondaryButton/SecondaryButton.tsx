import { LoadingButton } from '@ankr.com/ui';
import { ReactNode } from 'react';

export interface ISecondaryButtonProps {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick: () => void;
}

export const SecondaryButton = ({
  isLoading,
  ...props
}: ISecondaryButtonProps) => {
  return (
    <LoadingButton
      {...props}
      loading={isLoading}
      fullWidth
      size="large"
      variant="outlined"
    />
  );
};
