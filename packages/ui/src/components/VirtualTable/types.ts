import { CSSProperties, ReactNode } from 'react';

type VirtualTablePaginationType = 'more';

export interface VirtualTableQuery {
  page: number;
  order?: 'asc' | 'desc';
  orderBy?: string;
}
export interface VirtualTableProps<T extends Record<string, any>> {
  classes?: { root?: string; container?: string; rowHead?: string };
  cols: VirtualTableColumn<T>[];
  emptyMessage?: string;
  initializing?: boolean;
  isMoreRowsAvailable?: boolean;
  loading?: boolean;
  minHeight?: number;
  minWidth?: number | string;
  moreBtnText?: string;
  onChangePage?: (params: VirtualTableQuery) => void;
  onSort?: (params: VirtualTableQuery) => void;
  pagination?: VirtualTablePaginationType;
  preloader?: ReactNode;
  renderExpand?: (rowData: T, recalculateRows: () => void) => React.ReactNode;
  rows: T[];
  style?: CSSProperties;
}

export interface VirtualTableColumn<T> {
  field: string;
  width?: number | string;
  sortable?: boolean;
  headerName: React.ReactNode;
  render: ((row: T, index: number) => React.ReactNode) | string;
  align?: 'left' | 'center' | 'right';
}
