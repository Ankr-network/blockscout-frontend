type VirtualTablePaginationType = 'more';

export interface VirtualTableQuery {
  page: number;
  order?: 'asc' | 'desc';
  orderBy?: string;
}
export interface VirtualTableProps<T extends Record<string, any>> {
  cols: VirtualTableColumn<T>[];
  minWidth?: number | string;
  minHeight?: number;
  rows: T[];
  pagination?: VirtualTablePaginationType;
  onChangePage?: (params: VirtualTableQuery) => void;
  isMoreRowsAvailable?: boolean;
  onSort?: (params: VirtualTableQuery) => void;
  renderExpand?: (rowData: T, recalculateRows: () => void) => React.ReactNode;
  moreBtnText?: string;
  classes?: { root?: string; container?: string };
}

export interface VirtualTableColumn<T> {
  field: string;
  width?: number | string;
  sortable?: boolean;
  headerName: React.ReactNode;
  render: ((row: T, index: number) => React.ReactNode) | string;
  align?: 'left' | 'center' | 'right';
}
