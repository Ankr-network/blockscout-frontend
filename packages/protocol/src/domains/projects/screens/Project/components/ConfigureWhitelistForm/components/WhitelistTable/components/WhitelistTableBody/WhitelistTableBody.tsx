import { TableBody, TableRow } from '@mui/material';

import { Cell } from '../Cell';
import { WhitelistTableColumn, WhitelistTableItem } from '../../types';
import { useWhitelistTableBodyStyles } from './useWhitelistTableBodyStyles';

export interface WhitelistTableBodyProps {
  columns: WhitelistTableColumn[];
  data: WhitelistTableItem[];
}

export const WhitelistTableBody = ({
  columns,
  data,
}: WhitelistTableBodyProps) => {
  const { classes, cx } = useWhitelistTableBodyStyles();

  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index}>
          {columns.map(column => {
            const { headerCell, render, ...cellProps } = column;

            const className = cx(classes.cell, cellProps.className);
            const key = JSON.stringify(column);

            return (
              <Cell {...cellProps} className={className} key={key}>
                {column.render(row)}
              </Cell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};
