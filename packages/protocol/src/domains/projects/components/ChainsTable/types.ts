import { Chain } from 'modules/chains/types';

export interface ChainsTableColumn {
  align?: 'left' | 'center' | 'right';
  field: string;
  headerName: React.ReactNode;
  maxWidth?: string;
  render: (row: Chain, index: number) => React.ReactNode;
  width?: number | string;
}
