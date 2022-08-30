import { Button } from '@material-ui/core';
import classNames from 'classnames';

import { useSecondaryTabStyles } from './SecondaryTabStyles';
import { TabSize } from './types';

export interface SecondaryTabProps {
  className?: string;
  isLast?: boolean;
  isSelected?: boolean;
  label: string;
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
  const classes = useSecondaryTabStyles({ isLast, isSelected, size });

  return (
    <Button
      className={classNames(className, classes.secondaryTab)}
      onClick={onClick}
      variant="contained"
    >
      {label}
    </Button>
  );
};
