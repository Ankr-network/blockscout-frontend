import { Button } from '@mui/material';
import { ReactNode } from 'react';

import { useSecondaryTabStyles } from './SecondaryTabStyles';
import { TabSize } from './types';

export interface SecondaryTabProps {
  className?: string;
  isLast?: boolean;
  isSelected?: boolean;
  label: ReactNode | string;
  onClick?: () => void;
  size?: TabSize;
}

export const SecondaryTab = ({
  className,
  isLast,
  isSelected,
  label,
  onClick,
  size = TabSize.Medium,
}: SecondaryTabProps) => {
  const { classes, cx } = useSecondaryTabStyles({
    isLast,
    isSelected,
    size,
  });

  return (
    <Button
      className={cx(className, classes.secondaryTab)}
      onClick={onClick}
      variant="contained"
      fullWidth
    >
      {label}
    </Button>
  );
};
