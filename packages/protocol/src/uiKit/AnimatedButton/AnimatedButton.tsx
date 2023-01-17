import { Button, ButtonProps, CircularProgress } from '@mui/material';

import { ReactNode } from 'react';

import { useStyles } from './AnimatedButtonStyles';
import { useAnimatedButton } from './useAnimatedButton';

type AnimatedButtonProps = Omit<ButtonProps, 'children'> & {
  children: (isSuccess: boolean) => ReactNode;
  width?: number;

  data: any;
  loading: boolean;
};

export const AnimatedButton = ({
  width,

  data,
  loading,

  children,
  className,
  disabled,
  ...props
}: AnimatedButtonProps) => {
  const { isSuccess } = useAnimatedButton({
    data,
  });

  const { classes, cx } = useStyles({ isSuccess, width });

  return (
    <Button
      {...props}
      disabled={disabled || loading}
      className={cx(classes.root, className)}
    >
      {loading ? (
        <CircularProgress size={18} color="inherit" />
      ) : (
        children(isSuccess)
      )}
    </Button>
  );
};
