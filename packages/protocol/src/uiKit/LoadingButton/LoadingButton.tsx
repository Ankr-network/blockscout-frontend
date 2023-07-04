import { Button, ButtonProps, CircularProgress } from '@mui/material';

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
};

export const LoadingButton = ({ loading, ...props }: LoadingButtonProps) => {
  const startIcon = loading ? (
    <CircularProgress size={18} color="inherit" />
  ) : (
    props.startIcon
  );

  return <Button {...props} startIcon={startIcon} />;
};
