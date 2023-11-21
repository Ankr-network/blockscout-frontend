import { Check, Cross } from '@ankr.com/ui';

import { useArchiveMethodsCellStyles } from './useArchiveMethodsCellStyles';

export interface ArchiveMethodsCellProps {
  isArchive?: boolean;
}

export const ArchiveMethodsCell = ({ isArchive }: ArchiveMethodsCellProps) => {
  const { classes } = useArchiveMethodsCellStyles();

  if (isArchive) {
    return <Check className={classes.checkIcon} />;
  }

  return <Cross className={classes.crossIcon} />;
};
