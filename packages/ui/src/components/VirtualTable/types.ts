type VirtualTablePaginationType = 'more';
export interface VirtualTableSort {
  order: 'asc' | 'desc';
  orderBy: string;
}

export interface VirtualTableProps<T extends Record<string, any>> {
  cols: VirtualTableColumn<T>[];
  minWidth?: number | string;
  minHeight?: number;
  rows: T[];
  isLoading?: boolean;
  pagination?: VirtualTablePaginationType;
  startPage?: number;
  onChangePage?: (page: number) => void;
  isMoreRowsAvailable?: boolean;
  defaultSort?: VirtualTableSort;
  onSort?: (params: VirtualTableSort) => void;
  renderExpand?: (rowData: T, recalculateRows: () => void) => React.ReactNode;
  moreBtnText?: string;
}

export interface VirtualTableColumn<T> {
  field: string;
  width?: number | string;
  sortable?: boolean;
  headerName: React.ReactNode;
  render: ((row: T, index: number) => React.ReactNode) | string;
  align?: 'left' | 'center' | 'right';
}
