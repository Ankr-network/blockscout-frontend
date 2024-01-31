import { TableHead, TableRow, Typography } from '@mui/material';

import { Cell } from '../Cell';
import { WhitelistTableColumn } from '../../types';
import { useWhitelistTableHeadStyles } from './useWhitelistTableHeadStyles';

export interface WhitelistTableHeadProps {
  columns: WhitelistTableColumn[];
}

export const WhitelistTableHead = ({ columns }: WhitelistTableHeadProps) => {
  const { classes, cx } = useWhitelistTableHeadStyles();

  return (
    <TableHead>
      <TableRow>
        {columns.map(column => {
          const { headerCell, render, ...cellProps } = column;

          const className = cx(classes.cell, cellProps.className);
          const key = JSON.stringify(column);

          return (
            <Cell {...cellProps} className={className} key={key}>
              <Typography className={classes.content} variant="body3">
                {headerCell}
              </Typography>
            </Cell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
