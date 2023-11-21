import { ReactNode } from 'react';
import { TableCellProps } from '@mui/material';

import { ChainID } from 'modules/chains/types';

export interface WhitelistTableItem {
  address: string;
  chains: ChainID[];
}

export interface WhitelistTableColumn extends TableCellProps {
  headerCell: ReactNode;
  render: (row: WhitelistTableItem) => ReactNode;
}
