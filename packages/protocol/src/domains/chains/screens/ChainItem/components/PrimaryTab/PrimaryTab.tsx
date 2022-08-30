import { Button } from '@material-ui/core';

import { usePrimaryTabStyles } from './PrimaryTabStyles';

export interface PrimaryTabProps {
  isSelected: boolean;
  label: string;
}

export const PrimaryTab = ({ isSelected, label }: PrimaryTabProps) => {
  const classes = usePrimaryTabStyles(isSelected);

  return (
    <Button className={classes.chainItemTab} variant="outlined">
      {label}
    </Button>
  );
};
