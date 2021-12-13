import { Button, ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useToggleStyles } from './useToggleStyles';

interface IToggleProps extends ButtonProps {
  opened?: boolean;
  className?: string;
}

export const Toggle = React.forwardRef<HTMLButtonElement, IToggleProps>(
  ({ className, opened, ...props }, ref) => {
    const classes = useToggleStyles();
    return (
      <Button
        className={classNames(
          classes.component,
          opened && classes.componentOpened,
          className,
        )}
        ref={ref}
        variant="text"
        aria-label="open/close"
        {...props}
      >
        <div className={classNames(classes.line, classes.top)} />
        <div className={classNames(classes.line, classes.bottom)} />
      </Button>
    );
  },
);
