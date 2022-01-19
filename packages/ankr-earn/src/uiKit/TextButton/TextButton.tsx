import { Button, IButtonProps } from 'uiKit/Button';
import React from 'react';
import { useTextButtonStyles } from './useTextButtonStyles';

export const TextButton = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ ...props }, ref) => {
    const classes = useTextButtonStyles();

    return (
      <Button
        classes={{ root: classes.root }}
        variant="text"
        ref={ref}
        {...props}
      />
    );
  },
);
