import { ReactNode } from 'react';
import { TableCellProps } from '@mui/material';
import { ChainID } from '@ankr.com/chains-list';

export interface WhitelistTableItem {
  address: string;
  chains: ChainID[];
}

export interface WhitelistTableColumn extends TableCellProps {
  headerCell: ReactNode;
  render: (row: WhitelistTableItem) => ReactNode;
}
