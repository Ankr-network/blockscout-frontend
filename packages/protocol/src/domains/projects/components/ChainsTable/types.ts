import { Chain } from 'modules/chains/types';

export interface ColumnRenderProps {
  chain: Chain;
  index: number;
  allChains: Chain[];
}

export interface ChainsTableColumn {
  align?: 'left' | 'center' | 'right';
  field: string;
  headerName: React.ReactNode;
  maxWidth?: string;
  render: (props: ColumnRenderProps) => React.ReactNode;
  width?: number | string;
}
