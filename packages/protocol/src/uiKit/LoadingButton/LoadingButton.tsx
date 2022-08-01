import { Button, ButtonProps, CircularProgress } from '@material-ui/core';

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

export const LoadingButton = ({
  loading,

  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props}>
      {loading ? <CircularProgress size={18} color="inherit" /> : children}
    </Button>
  );
};
