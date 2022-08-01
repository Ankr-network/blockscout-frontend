import classNames from 'classnames';
import { ReactNode } from 'react';

import {
  LoadingButton,
  LoadingButtonProps,
} from 'uiKit/LoadingButton/LoadingButton';
import { useStyles } from './AnimatedButtonStyles';
import { useAnimatedButton } from './useAnimatedButton';

type AnimatedButtonProps = Omit<LoadingButtonProps, 'children'> & {
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

  const classes = useStyles({ isSuccess, width });

  return (
    <LoadingButton
      {...props}
      loading={loading}
      disabled={disabled || loading}
      className={classNames(classes.root, className)}
    >
      {children(isSuccess)}
    </LoadingButton>
  );
};
