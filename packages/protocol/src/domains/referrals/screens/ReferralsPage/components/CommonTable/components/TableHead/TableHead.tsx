import { TableHead as MuiTableHead, TableRow, Typography } from '@mui/material';

import { CommonCell } from '../CommonCell';
import { ITableColumn } from '../../types';
import { useTableHeadStyles } from './useTableHeadStyles';

export interface ITableHeadProps {
  cellClassName?: string;
  columns: ITableColumn[];
}

export const TableHead = ({ cellClassName, columns }: ITableHeadProps) => {
  const { classes, cx } = useTableHeadStyles();

  return (
    <MuiTableHead>
      <TableRow>
        {columns.map(({ align, title }) => (
          <CommonCell
            align={align}
            className={cx(classes.cell, cellClassName)}
            key={title}
          >
            <Typography color="textSecondary" variant="body3">
              {title}
            </Typography>
          </CommonCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};
