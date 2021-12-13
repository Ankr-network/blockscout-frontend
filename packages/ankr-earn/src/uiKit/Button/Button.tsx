import { Button as ButtonComponent, ButtonProps } from '@material-ui/core';
import React from 'react';
import { QueryLoading } from 'uiKit/QueryLoading';

type ButtonsVariant = 'contained' | 'outlined' | 'text';

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    variant?: ButtonsVariant;
    submit?: boolean;
    style?: React.CSSProperties;
    isLoading?: boolean;
  }
>(
  (
    { variant = 'contained', submit, style, isLoading, endIcon, ...props },
    ref,
  ) => (
    <ButtonComponent
      variant={variant}
      component="button"
      type={submit ? 'submit' : 'button'}
      ref={ref}
      style={style}
      {...props}
      endIcon={isLoading ? <QueryLoading size={16} /> : endIcon}
    />
  ),
);
