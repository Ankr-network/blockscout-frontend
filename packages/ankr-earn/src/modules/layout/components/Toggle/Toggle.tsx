import { ButtonProps, Button } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

import { useToggleStyles as useStyles } from './useToggleStyles';

interface IToggle extends ButtonProps {
  opened?: boolean;
  className?: string;
}

export const Toggle = React.forwardRef<HTMLButtonElement, IToggle>(
  ({ className, opened, ...props }, ref) => {
    const classes = useStyles();
    return (
      <Button
        ref={ref}
        aria-label="open/close"
        className={classNames(
          classes.component,
          opened && classes.componentOpened,
          className,
        )}
        variant="text"
        {...props}
      >
        <div className={classNames(classes.line, classes.top)} />

        <div className={classNames(classes.line, classes.bottom)} />
      </Button>
    );
  },
);
