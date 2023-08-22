import { ReactNode } from 'react';

type VirtualTablePaginationType = 'more';

export interface VirtualTableQuery {
  page: number;
  order?: 'asc' | 'desc';
  orderBy?: string;
}
export interface VirtualTableProps<T extends Record<string, any>> {
  classes?: {
    root?: string;
    container?: string;
    head?: string;
    rowContainer?: string;
    row?: string;
  };
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
  searchContent?: string;
  searchKey?: string;
}

export interface VirtualTableColumn<T> {
  field: string;
  width?: number | string;
  minWidth?: number | string;
  sortable?: boolean;
  headerName: React.ReactNode;
  render: ((row: T, index: number) => React.ReactNode) | string;
  align?: 'left' | 'center' | 'right';
}
