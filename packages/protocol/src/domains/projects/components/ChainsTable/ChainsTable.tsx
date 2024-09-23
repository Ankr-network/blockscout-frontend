import { TableContainer } from '@mui/material';
import { Chain } from '@ankr.com/chains-list';

import { ChainsTableBody } from './components/ChainsTableBody';
import { ChainsTableColumn } from './types';
import { useChainsTableStyles } from './useChainsTableStyles';

export interface ChainsTableProps {
  chains: Chain[];
  columns: ChainsTableColumn[];
}

export const ChainsTable = ({ chains, columns }: ChainsTableProps) => {
  const { classes } = useChainsTableStyles();

  return (
    <TableContainer className={classes.root} component="table">
      <ChainsTableBody
        cellClassName={classes.cell}
        chains={chains}
        columns={columns}
      />
    </TableContainer>
  );
};
