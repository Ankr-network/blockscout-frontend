import { Button as ButtonComponent, ButtonProps } from '@material-ui/core';
import React from 'react';
import { Spinner } from 'uiKit/Spinner';
import { useButtonStyles } from './useButtonStyles';

type ButtonsVariant = 'contained' | 'outlined' | 'text';

export interface IButtonProps extends ButtonProps {
  variant?: ButtonsVariant;
  submit?: boolean;
  style?: React.CSSProperties;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    { variant = 'contained', submit, style, isLoading, endIcon, ...props },
    ref,
  ) => {
    const classes = useButtonStyles();

    return (
      <ButtonComponent
        variant={variant}
        component="button"
        type={submit ? 'submit' : 'button'}
        ref={ref}
        style={style}
        {...props}
        endIcon={
          isLoading ? (
            <Spinner size={16} variant="circle" className={classes.loader} />
          ) : (
            endIcon
          )
        }
      />
    );
  },
);
