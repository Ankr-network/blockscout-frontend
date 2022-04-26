type TablePaginationType = 'more';
export interface TableSort {
  order: 'asc' | 'desc';
  orderBy: string;
}

export interface TableProps<T extends Record<string, any>> {
  cols: TableColumn<T>[];
  minWidth?: number | string;
  minHeight?: number;
  rows: T[];
  isLoading?: boolean;
  pagination?: TablePaginationType;
  startPage?: number;
  onChangePage?: (page: number) => void;
  isMoreRowsAvailable?: boolean;
  defaultSort?: TableSort;
  onSort?: (params: TableSort) => void;
  renderExpand?: (rowData: T) => React.ReactNode;
  moreBtnText?: string;
}

export interface TableColumn<T> {
  field: string;
  width?: number | string;
  sortable?: boolean;
  headerName: React.ReactNode;
  render: ((row: T, index: number) => React.ReactNode) | string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}
