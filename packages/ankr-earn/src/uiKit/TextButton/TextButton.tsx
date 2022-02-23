import React from 'react';

import { Button, IButtonProps } from 'uiKit/Button';

import { useTextButtonStyles } from './useTextButtonStyles';

export const TextButton = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ ...props }, ref) => {
    const classes = useTextButtonStyles();

    return (
      <Button
        ref={ref}
        classes={{ root: classes.root }}
        variant="text"
        {...props}
      />
    );
  },
);
