import { Button, ButtonProps, CircularProgress } from '@mui/material';

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

export const LoadingButton = ({
  loading,

  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      {...props}
      startIcon={
        loading ? <CircularProgress size={18} color="inherit" /> : null
      }
    />
  );
};
