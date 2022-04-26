import classNames from 'classnames';
import {
  createContext,
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useContext,
  useRef,
  useState,
  CSSProperties,
  useLayoutEffect,
  useMemo,
} from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowRenderer,
} from 'react-virtualized';
import { LoadableButton } from '../LoadableButton';
import {
  VirtualTableColumn,
  VirtualTableProps,
  VirtualTableSort,
} from './types';
import { useStyles } from './useStyles';

export const DEFAULT_CELL_MIN_HEIGHT = 56;

interface ITableContext {
  expandedRow: number;
  toggleExpand: (index: number) => void;
  handleLoadMore: () => void;
  isLoadMoreLoading: boolean;
  handleSort: MouseEventHandler<HTMLElement>;
  isSortLoading: boolean;
  sort?: VirtualTableSort;
  cache: CellMeasurerCache;
  rows: any[];
  ref: MutableRefObject<List | undefined>;
  cols: VirtualTableProps<any>['cols'];
  colWidths: MutableRefObject<number[]>;
  colsWidthCalculated: boolean;
  setColsWidthCalculated: (value: boolean) => void;
  renderExpand?: (row: any, recalculateRows: () => void) => React.ReactNode;
  recalculateRows: () => void;
}

export const TableContext = createContext<ITableContext>(null as any);

export function useTableContext({
  onChangePage,
  onSort,
  startPage = 1,
  defaultSort,
  rows,
  cols,
  renderExpand,
}: Pick<
  VirtualTableProps<any>,
  | 'onChangePage'
  | 'startPage'
  | 'defaultSort'
  | 'onSort'
  | 'rows'
  | 'cols'
  | 'renderExpand'
>) {
  const ref = useRef<List>();

  const [expandedRow, setExpandedRow] = useState(-1);
  const [page, setPage] = useState(startPage);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [sort, setSort] = useState(defaultSort);
  const [isSortLoading, setIsSortLoading] = useState(false);
  const [colsWidthCalculated, setColsWidthCalculated] = useState(false);
  const colWidths = useRef<number[]>([]);

  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        minHeight: DEFAULT_CELL_MIN_HEIGHT,
      }),
    [],
  );

  const recalculateRows = useCallback(() => {
    if (ref.current) {
      cache.clearAll();
      ref.current.recomputeRowHeights();
    }
  }, [cache]);

  const toggleExpand = (index: number) => {
    setExpandedRow(index === expandedRow ? -1 : index);
  };

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

      const nextSort: VirtualTableSort = {
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
    expandedRow,
    toggleExpand,
    renderExpand,
    handleLoadMore,
    isLoadMoreLoading,
    handleSort,
    isSortLoading,
    sort,
    cache,
    rows,
    cols,
    ref,
    colWidths,
    colsWidthCalculated,
    setColsWidthCalculated,
    recalculateRows,
  };
}

export const useTable = () => {
  return useContext(TableContext);
};

// const getSortArrow = (order: VirtualTableSort['order']) => {
//   return order === 'desc' ? '↓' : '↑';
// };

export const PaginationMore = ({ text = 'Show more' }: { text?: string }) => {
  const classes = useStyles();

  const { isLoadMoreLoading, handleLoadMore } = useTable();

  return (
    <div className={classes.row} style={{ justifyContent: 'center' }}>
      <LoadableButton
        className={classes.moreBtn}
        loading={isLoadMoreLoading}
        disabled={isLoadMoreLoading}
        onClick={handleLoadMore}
        variant="text"
      >
        {text}
      </LoadableButton>
    </div>
  );
};

interface ColProps {
  col: VirtualTableColumn<any>;
  rowData: any;
  rowIndex: number;
  colIndex: number;
}

export const Col = ({ col, rowData, rowIndex, colIndex }: ColProps) => {
  const classes = useStyles();
  const { colWidths } = useTable();

  const renderCol =
    typeof col.render === 'string'
      ? rowData[col.render]
      : col.render(rowData, rowIndex);

  return (
    <div
      className={classNames(classes.col, {
        [classes.colGrow]: !col.width,
      })}
      style={{
        width: col.width || `${colWidths.current[colIndex]}%`,
        textAlign: col.align,
      }}
    >
      {renderCol}
    </div>
  );
};

export const TableHead = () => {
  const { cols, colWidths, setColsWidthCalculated } = useTable();
  const classes = useStyles();
  const headRowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (headRowRef.current) {
      setColsWidthCalculated(false);
      colWidths.current = [];

      const rowWidth = headRowRef.current.offsetWidth;

      headRowRef.current.childNodes.forEach((node: any) => {
        colWidths.current.push((node.offsetWidth / rowWidth) * 100);
      });

      setColsWidthCalculated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols]);

  return (
    <div ref={headRowRef} className={classNames(classes.row, classes.rowHead)}>
      {cols.map((col, index) => {
        return (
          <div
            key={col.field}
            className={classNames(classes.col, {
              [classes.colGrow]: !col.width,
            })}
            style={{
              width: col.width || `${colWidths.current[index]}%`,
              textAlign: col.align,
            }}
          >
            {col.headerName}
          </div>
        );
      })}
    </div>
  );
};

interface RowProps {
  style?: CSSProperties;
  index: number;
}

export const Row = ({ style, index }: RowProps) => {
  const { rows, cols, expandedRow, renderExpand, recalculateRows } = useTable();
  const classes = useStyles();

  const rowData = rows[index];

  return (
    <div style={style}>
      <div
        className={classNames(classes.rowColumn, {
          [classes.rowExpanded]: expandedRow === index,
        })}
      >
        <div className={classNames(classes.row)}>
          {cols.map((col, colIndex) => (
            <Col
              key={col.field}
              colIndex={colIndex}
              col={col}
              rowData={rowData}
              rowIndex={index}
            />
          ))}
        </div>
        {expandedRow === index && renderExpand && (
          <div className={classes.rowExpand}>
            {renderExpand(rowData, recalculateRows)}
          </div>
        )}
      </div>
    </div>
  );
};

export const useRowRenderer = () => {
  const { cache } = useTable();

  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, parent, style }) => {
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}
        >
          <Row index={index} style={style} />
        </CellMeasurer>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return rowRenderer;
};
