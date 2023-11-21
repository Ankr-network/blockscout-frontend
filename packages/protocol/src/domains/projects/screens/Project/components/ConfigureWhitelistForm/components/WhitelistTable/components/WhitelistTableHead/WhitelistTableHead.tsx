import { TableHead, TableRow, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

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
          const variant = 'body3' as Variant;

          return (
            <Cell {...cellProps} className={className} key={key}>
              <Typography className={classes.content} variant={variant}>
                {headerCell}
              </Typography>
            </Cell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
