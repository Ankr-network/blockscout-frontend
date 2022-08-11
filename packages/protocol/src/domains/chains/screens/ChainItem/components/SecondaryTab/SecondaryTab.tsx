import { Button } from '@material-ui/core';

import { useSecondaryTabStyles } from './SecondaryTabStyles';

export interface SecondaryTabProps {
  isLast?: boolean;
  isSelected: boolean;
  label: string;
}

export const SecondaryTab = ({
  isLast,
  isSelected,
  label,
}: SecondaryTabProps) => {
  const classes = useSecondaryTabStyles({ isLast, isSelected });

  return (
    <Button className={classes.secondaryTab} variant="contained">
      {label}
    </Button>
  );
};
