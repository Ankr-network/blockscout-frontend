import {
  Collapse,
  TableCell,
  TableCellProps,
  TableRow,
} from '@material-ui/core';
import classNames from 'classnames';
import {
  createContext,
  MouseEventHandler,
  useCallback,
  useContext,
  useState,
} from 'react';
import { LoadableButton } from '../LoadableButton';
import { TableColumn, TableProps, TableSort } from './types';
import { useStyles } from './useStyles';

export const DEFAULT_MIN_HEIGHT = 300;

interface ITableContext {
  expands: { [key: string]: boolean };
  toggleExpand: (index: number) => void;
  handleLoadMore: () => void;
  isLoadMoreLoading: boolean;
  handleSort: MouseEventHandler<HTMLElement>;
  isSortLoading: boolean;
  sort?: TableSort;
}

export const TableContext = createContext<ITableContext>(null as any);

export function useTableContext({
  onChangePage,
  onSort,
  startPage = 1,
  defaultSort,
}: Pick<
  TableProps<any>,
  'onChangePage' | 'startPage' | 'defaultSort' | 'onSort'
>) {
  const [expands, setExpands] = useState<ITableContext['expands']>({});
  const [page, setPage] = useState(startPage);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [sort, setSort] = useState(defaultSort);
  const [isSortLoading, setIsSortLoading] = useState(false);

  const toggleExpand = useCallback(
    (index: number) => {
      setExpands({
        ...expands,
        [index]: !expands[index],
      });
    },
    [expands],
  );

  const handleLoadMore = useCallback(async () => {
    const nextPage = page + 1;

    setPage(nextPage);

    if (onChangePage) {
      setIsLoadMoreLoading(true);

      try {
        await onChangePage(nextPage);
      } catch {
        /** */
      }

      setIsLoadMoreLoading(false);
    }
  }, [onChangePage, page]);

  const handleSort: MouseEventHandler<HTMLElement> = useCallback(
    async event => {
      const field = event.currentTarget.getAttribute('data-field')!;

      const nextSort: TableSort = {
        orderBy: field,
        order: sort?.order === 'asc' ? 'desc' : 'asc',
      };

      setSort(nextSort);

      if (onSort) {
        setIsSortLoading(true);

        try {
          await onSort(nextSort);
        } catch {
          /** */
        }

        setIsSortLoading(false);
      }
    },
    [onSort, sort],
  );

  return {
    expands,
    toggleExpand,
    handleLoadMore,
    isLoadMoreLoading,
    handleSort,
    isSortLoading,
    sort,
  };
}

export const useTable = () => {
  return useContext(TableContext);
};

const getSortArrow = (order: TableSort['order']) => {
  return order === 'desc' ? '↓' : '↑';
};

export const HeadCell = ({
  align,
  field,
  width,
  headerName,
  sortable,
}: TableColumn<any>) => {
  const classes = useStyles();
  const { sort, handleSort } = useTable();

  return (
    <TableCell
      align={align}
      width={width}
      data-field={field}
      onClick={sortable ? handleSort : undefined}
      className={classNames(classes.headCell, {
        [classes.headCellSortable]: sortable,
      })}
    >
      {headerName}
      {sort?.orderBy === field && (
        <span className={classes.headCellSort}>{getSortArrow(sort.order)}</span>
      )}
    </TableCell>
  );
};

export const BodyCell = ({
  rowData,
  column: { render, align },
  index,
  ...rest
}: {
  rowData: any;
  column: TableColumn<any>;
  index: number;
} & TableCellProps) => {
  const classes = useStyles();

  const renderRow =
    typeof render === 'string' ? rowData[render] : render(rowData, index);

  return (
    <TableCell {...rest} align={align} className={classes.bodyCell}>
      {renderRow}
    </TableCell>
  );
};

export const ExpandedRow = ({
  rowData,
  colsLength,
  renderExpand,
  ...rest
}: {
  renderExpand?: (rowData: any) => React.ReactNode;
  colsLength: number;
  rowData: any;
} & TableCellProps) => {
  const classes = useStyles();

  if (!renderExpand) {
    return null;
  }

  return (
    <TableRow>
      <TableCell {...rest} colSpan={colsLength} className={classes.bodyCell}>
        <Collapse in>{renderExpand(rowData)}</Collapse>
      </TableCell>
    </TableRow>
  );
};

export const PaginationMore = ({
  colsLength,
  text = 'Show more',
}: {
  colsLength: number;
  text?: string;
}) => {
  const classes = useStyles();

  const { isLoadMoreLoading, handleLoadMore } = useTable();

  return (
    <TableRow className={classes.row}>
      <TableCell
        padding="none"
        align="center"
        colSpan={colsLength}
        className={classes.paginationMoreCell}
      >
        <LoadableButton
          loading={isLoadMoreLoading}
          disabled={isLoadMoreLoading}
          onClick={handleLoadMore}
          variant="text"
        >
          {text}
        </LoadableButton>
      </TableCell>
    </TableRow>
  );
};
