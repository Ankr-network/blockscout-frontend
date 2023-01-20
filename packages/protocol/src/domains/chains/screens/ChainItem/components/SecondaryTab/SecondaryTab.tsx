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
  isDarkTheme?: boolean;
}

export const SecondaryTab = ({
  className,
  isLast,
  isSelected,
  label,
  onClick,
  isDarkTheme,
  size = TabSize.Medium,
}: SecondaryTabProps) => {
  const { classes, cx } = useSecondaryTabStyles({
    isLast,
    isSelected,
    size,
    isDarkTheme,
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
