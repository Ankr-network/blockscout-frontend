import { Button as ButtonComponent, ButtonProps } from '@material-ui/core';
import { forwardRef, ForwardedRef } from 'react';

import { Spinner } from 'uiKit/Spinner';

import { useButtonStyles } from './useButtonStyles';

type ButtonsVariant = 'contained' | 'outlined' | 'text';

export interface IButtonProps extends ButtonProps {
  variant?: ButtonsVariant;
  submit?: boolean;
  style?: React.CSSProperties;
  isLoading?: boolean;
}

export const Button = forwardRef(
  (
    {
      variant = 'contained',
      submit,
      style,
      isLoading,
      endIcon,
      ...props
    }: IButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const classes = useButtonStyles();

    return (
      <ButtonComponent
        ref={ref}
        component="button"
        style={style}
        type={submit ? 'submit' : 'button'}
        variant={variant}
        {...props}
        endIcon={
          isLoading ? (
            <Spinner className={classes.loader} size={16} variant="circle" />
          ) : (
            endIcon
          )
        }
      />
    );
  },
);
