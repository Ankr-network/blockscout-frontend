import { Button } from '@mui/material';

import { usePrimaryTabStyles } from './PrimaryTabStyles';

export interface PrimaryTabProps {
  isSelected: boolean;
  label: string;
  className?: string;
}

export const PrimaryTab = ({
  className,
  isSelected,
  label,
}: PrimaryTabProps) => {
  const { classes, cx } = usePrimaryTabStyles(isSelected);

  return (
    <Button className={cx(classes.primaryTab, className)} variant="outlined">
      {label}
    </Button>
  );
};
