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
  useEffect,
} from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowRenderer,
  WindowScroller,
} from 'react-virtualized';

import { LoadableButton } from '../LoadableButton';
import {
  VirtualTableColumn,
  VirtualTableProps,
  VirtualTableQuery,
} from './types';
import { useStyles } from './useStyles';

const DEFAULT_CELL_MIN_HEIGHT = 56;

const DEFAULT_QUERY = {
  page: 1,
};

interface ITableContext {
  cache: CellMeasurerCache;
  cols: VirtualTableProps<any>['cols'];
  colsWidthCalculated: boolean;
  colWidths: MutableRefObject<number[]>;
  expandedRow: number;
  handleLoadMore: () => void;
  handleSort: MouseEventHandler<HTMLElement>;
  isSortLoading: boolean;
  loading?: boolean;
  query: VirtualTableQuery;
  recalculateRows: () => void;
  ref: MutableRefObject<List | undefined>;
  renderExpand?: (row: any, recalculateRows: () => void) => React.ReactNode;
  rows: any[];
  setColsWidthCalculated: (value: boolean) => void;
  toggleExpand: (index: number) => void;
}

export const TableContext = createContext<ITableContext>(null as any);

export function useTableContext({
  cols,
  loading,
  onChangePage,
  onSort,
  renderExpand,
  rows,
}: Pick<
  VirtualTableProps<any>,
  'onChangePage' | 'onSort' | 'rows' | 'cols' | 'renderExpand' | 'loading'
>) {
  const ref = useRef<List>();

  const [query, setQuery] = useState<VirtualTableQuery>(DEFAULT_QUERY);

  const [expandedRow, setExpandedRow] = useState(-1);
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
    const nextQuery = { ...query, page: (query.page || 1) + 1 };
    setQuery(nextQuery);

    if (onChangePage) {
      try {
        await onChangePage(nextQuery);
      } catch {
        /** */
      }
    }
  }, [onChangePage, query]);

  const handleSort: MouseEventHandler<HTMLElement> = useCallback(
    async event => {
      const field = event.currentTarget.getAttribute('data-field')!;

      const nextQuery: VirtualTableQuery = {
        ...query,
        orderBy: field,
        order: query.order === 'asc' ? 'desc' : 'asc',
      };

      setQuery(nextQuery);

      if (onSort) {
        setIsSortLoading(true);

        try {
          await onSort(nextQuery);
        } catch {
          /** */
        }

        setIsSortLoading(false);
      }
    },
    [onSort, query],
  );

  return {
    query,
    expandedRow,
    toggleExpand,
    renderExpand,
    handleLoadMore,
    handleSort,
    isSortLoading,
    cache,
    rows,
    cols,
    ref,
    colWidths,
    colsWidthCalculated,
    setColsWidthCalculated,
    recalculateRows,
    loading,
  };
}

export const useTable = () => {
  return useContext(TableContext);
};

const getSortArrow = (order: VirtualTableQuery['order']) => {
  return order === 'desc' ? '↓' : '↑';
};

export const PaginationMore = ({ text = 'Show more' }: { text?: string }) => {
  const { classes, cx } = useStyles();

  const { loading, handleLoadMore } = useTable();

  return (
    <div
      className={cx(classes.row, classes.moreRow)}
      style={{ justifyContent: 'center' }}
    >
      <LoadableButton
        className={classes.moreBtn}
        loading={loading}
        disabled={loading}
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
  const { classes, cx } = useStyles();
  const { colWidths } = useTable();

  const renderCol =
    typeof col.render === 'string'
      ? rowData[col.render]
      : col.render(rowData, rowIndex);

  return (
    <div
      className={cx(classes.col, {
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

interface TableHeadProps {
  className?: string;
}

export const TableHead = ({ className }: TableHeadProps) => {
  const { query, cols, colWidths, setColsWidthCalculated, handleSort } =
    useTable();
  const { classes, cx } = useStyles();
  const headRowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (headRowRef.current) {
      setColsWidthCalculated(false);
      colWidths.current = [];

      const rowWidth = headRowRef.current.offsetWidth + 2;

      headRowRef.current.childNodes.forEach((node: any) => {
        colWidths.current.push((node.offsetWidth / rowWidth) * 100);
      });

      setColsWidthCalculated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols]);

  return (
    <div
      ref={headRowRef}
      className={cx(classes.row, classes.rowHead, className)}
    >
      {cols.map((col, index) => {
        return (
          <div
            key={col.field}
            className={cx(classes.col, {
              [classes.colGrow]: !col.width,
            })}
            style={{
              width: col.width || `${colWidths.current[index]}%`,
              textAlign: col.align,
            }}
          >
            <span
              data-field={col.field}
              role="cell"
              onClick={col.sortable ? handleSort : undefined}
              className={cx({ [classes.colSortable]: col.sortable })}
            >
              <span
                data-content={getSortArrow(query.order)}
                className={cx({
                  [classes.colSortable]: col.sortable,
                  [classes.sortIconActive]: query.orderBy === col.field,
                })}
              >
                {col.headerName}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

interface RowProps {
  style?: CSSProperties;
  index: number;
  rowContainerClass?: string;
  rowClass?: string;
}

export const Row = ({
  style,
  index,
  rowContainerClass,
  rowClass,
}: RowProps) => {
  const { rows, cols, expandedRow, renderExpand, recalculateRows } = useTable();
  const { classes, cx } = useStyles();

  const rowData = rows[index];

  return (
    <div style={style} className={cx(classes.vRow)}>
      <div
        className={cx(classes.rowColumn, rowContainerClass, {
          [classes.rowExpanded]: expandedRow === index,
        })}
      >
        <div className={cx(classes.row, rowClass)}>
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

export const useRowRenderer = (
  rowContainerClass?: string,
  rowClass?: string,
) => {
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
          <Row
            index={index}
            style={style}
            rowContainerClass={rowContainerClass}
            rowClass={rowClass}
          />
        </CellMeasurer>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowContainerClass, rowClass],
  );

  return rowRenderer;
};

export const useWindowScroller = () => {
  const windowScrollerRef = useRef<WindowScroller>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() =>
      windowScrollerRef.current?.updatePosition(),
    );
    const root = document.querySelector('#root > div')!;

    observer.observe(root);

    return () => {
      observer.unobserve(root);
    };
  }, []);

  return windowScrollerRef;
};

export const getSearchedRows = (
  rows: any[],
  searchContent?: string,
  searchKey?: string,
) =>
  searchContent && searchKey
    ? rows.filter(
        item =>
          item[searchKey].toLowerCase().indexOf(searchContent.toLowerCase()) >
          -1,
      )
    : rows;
