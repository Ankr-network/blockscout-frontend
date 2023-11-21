import { TableBody, TableCell, TableRow } from '@mui/material';

import { Chain } from 'modules/chains/types';

import { ChainsTableColumn } from '../../types';

export interface ChainsTableBodyProps {
  cellClassName: string;
  chains: Chain[];
  columns: ChainsTableColumn[];
}

export const ChainsTableBody = ({
  cellClassName,
  chains,
  columns,
}: ChainsTableBodyProps) => (
  <TableBody>
    {chains.map((chain, index) => (
      <TableRow key={index}>
        {columns.map(({ align, render }, field) => (
          <TableCell key={field} align={align} className={cellClassName}>
            {render(chain, index)}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);
