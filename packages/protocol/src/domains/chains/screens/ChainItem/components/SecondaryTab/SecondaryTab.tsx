import { Button } from '@material-ui/core';
import classNames from 'classnames';
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
  const classes = useSecondaryTabStyles({
    isLast,
    isSelected,
    size,
    isDarkTheme,
  });

  return (
    <Button
      className={classNames(className, classes.secondaryTab)}
      onClick={onClick}
      variant="contained"
      fullWidth
    >
      {label}
    </Button>
  );
};
