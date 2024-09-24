import { TableCell, TableCellProps } from '@mui/material';

import { useCommonCellStyles } from './useCommonCellStyles';

export interface ICommonCellProps extends TableCellProps {}

export const CommonCell = (props: ICommonCellProps) => {
  const { classes } = useCommonCellStyles();

  return <TableCell align="left" classes={classes} variant="body" {...props} />;
};
