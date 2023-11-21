import { TableCell, TableCellProps } from '@mui/material';

import { useCellStyles } from './useCellStyles';

export const Cell = ({ className, ...props }: TableCellProps) => {
  const { classes, cx } = useCellStyles();

  return <TableCell {...props} className={cx(classes.root, className)} />;
};
