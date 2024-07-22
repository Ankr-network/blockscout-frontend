import { Button } from '@mui/material';
import { ReactNode } from 'react';

import { TabSize } from './types';
import { useSecondaryTabStyles } from './SecondaryTabStyles';

export interface SecondaryTabProps {
  className?: string;
  disabled?: boolean;
  endIcon?: ReactNode;
  isLast?: boolean;
  isSelected?: boolean;
  label: ReactNode | string;
  onClick?: () => void;
  size?: TabSize;
  startIcon?: ReactNode;
}

export const SecondaryTab = ({
  className,
  disabled,
  endIcon,
  isLast,
  isSelected,
  label,
  onClick,
  size = TabSize.Medium,
  startIcon,
}: SecondaryTabProps) => {
  const { classes, cx } = useSecondaryTabStyles({
    isLast,
    isSelected,
    size,
  });

  return (
    <Button
      component="h3"
      className={cx(classes.secondaryTab, className)}
      disabled={disabled}
      endIcon={endIcon}
      fullWidth
      onClick={onClick}
      startIcon={startIcon}
      variant="contained"
    >
      {label}
    </Button>
  );
};
