import React from 'react';
import classNames from 'classnames';
import { Button } from '@material-ui/core';

import { label } from './const';
import { useStyles } from './ExpandButtonStyles';

export interface ExpandButtonProps {
  className?: string;
  isVisible?: boolean;
  onClick: () => void;
}

export const ExpandButton = ({
  className = '',
  isVisible = true,
  onClick,
}: ExpandButtonProps) => {
  const { expandButton } = useStyles();

  return isVisible ? (
    <Button
      className={classNames(className, expandButton)}
      onClick={onClick}
      variant="outlined"
    >
      {label}
    </Button>
  ) : null;
};
