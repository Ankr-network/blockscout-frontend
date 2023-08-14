import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';

import { useColumns } from './useColumns';
import { useWhitelistData } from '../../useWhitelistData';
import { useTableStyles } from './useTableStyles';

interface TableProps {
  onWhitelistDialogOpen: () => void;
}

export const Table = ({ onWhitelistDialogOpen }: TableProps) => {
  const { classes, cx } = useTableStyles();
  const { columns } = useColumns({ onWhitelistDialogOpen });

  const { data: rows } = useWhitelistData();

  if (rows.length === 0) return null;

  return (
    <TableContainer className={classes.tableContainer} component="table">
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell
              key={column.field}
              className={cx(classes.headerCell, classes.cell)}
              {...column}
            >
              {column.headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row, index) => (
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
