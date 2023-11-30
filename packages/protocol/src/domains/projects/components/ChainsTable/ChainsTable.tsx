import { TableContainer } from '@mui/material';

import { Chain } from 'modules/chains/types';

import { ChainsTableBody } from './components/ChainsTableBody';
import { ChainsTableColumn } from './types';
import { ChainsTableHead } from './components/ChainsTableHead';
import { useChainsTableStyles } from './useChainsTableStyles';

export interface ChainsTableProps {
  chains: Chain[];
  columns: ChainsTableColumn[];
}

export const ChainsTable = ({ chains, columns }: ChainsTableProps) => {
  const { classes } = useChainsTableStyles();

  return (
    <TableContainer className={classes.root} component="table">
      <ChainsTableHead cellClassName={classes.cell} columns={columns} />
      <ChainsTableBody
        cellClassName={classes.cell}
        chains={chains}
        columns={columns}
      />
    </TableContainer>
  );
};
