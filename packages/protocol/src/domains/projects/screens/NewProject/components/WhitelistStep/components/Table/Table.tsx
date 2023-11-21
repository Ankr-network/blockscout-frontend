import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';

import { AddToWhitelistFormData } from 'domains/projects/store';

import { useColumns } from './useColumns';
import { useTableStyles } from './useTableStyles';

interface TableProps {
  data: AddToWhitelistFormData[];
  onWhitelistDialogOpen: () => void;
}

export const Table = ({ data, onWhitelistDialogOpen }: TableProps) => {
  const { classes, cx } = useTableStyles();
  const { columns } = useColumns({ onWhitelistDialogOpen });

  if (data.length === 0) return null;

  return (
    <TableContainer className={classes.tableContainer} component="table">
      <TableHead>
        <TableRow>
          {columns.map(({ render, headerName, ...column }) => (
            <TableCell
              key={column.field}
              className={cx(classes.headerCell, classes.cell)}
              {...column}
            >
              {headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column, field) => {
              const { render, align } = column;

              return (
                <TableCell key={field} align={align} className={classes.cell}>
                  {render(row, index)}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};
