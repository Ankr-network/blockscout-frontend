import { TableCell, TableHead, TableRow } from '@mui/material';

import { ChainsTableColumn } from '../../types';

export interface ChainsTableHeadProps {
  cellClassName: string;
  columns: ChainsTableColumn[];
}

export const ChainsTableHead = ({
  cellClassName,
  columns,
}: ChainsTableHeadProps) => (
  <TableHead>
    <TableRow>
      {columns.map(({ align, width, field, headerName }) => (
        <TableCell
          align={align}
          className={cellClassName}
          key={field}
          width={width}
        >
          {headerName}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
