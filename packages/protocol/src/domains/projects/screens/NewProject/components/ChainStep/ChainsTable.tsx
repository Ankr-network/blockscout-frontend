import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import { useChainStepStyles } from './useChainStepStyles';
import { useChainsTable } from './hooks/useChainsTable';
import { useProjectChains } from '../../hooks/useProjectChains';
import { OverlaySpinner } from '@ankr.com/ui';

export const ChainsTable = () => {
  const { columns } = useChainsTable();

  const { projectChains: rows, isLoading } = useProjectChains();

  const { classes } = useChainStepStyles();

  if (isLoading) return <OverlaySpinner />;

  return (
    <TableContainer className={classes.tableContainer} component="table">
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.field} className={classes.cell} {...column}>
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
