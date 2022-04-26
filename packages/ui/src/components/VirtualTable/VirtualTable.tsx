import { Paper } from '@material-ui/core';
import { useEffect } from 'react';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';
import { VirtualTableProps } from './types';
import { useStyles } from './useStyles';
import {
  PaginationMore,
  TableContext,
  TableHead,
  useRowRenderer,
  useTable,
  useTableContext,
} from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function VirtualTableInternal<T>(props: VirtualTableProps<T>) {
  const { minWidth, minHeight, moreBtnText, isMoreRowsAvailable } = props;
  const classes = useStyles();
  const { cache, ref, colsWidthCalculated, rows } = useTable();
  const rowRenderer = useRowRenderer();

  return (
    <div className={classes.root}>
      <Paper className={classes.container} style={{ minWidth, minHeight }}>
        <TableHead />
        <div className={classes.listContainer}>
          {colsWidthCalculated && (
            <WindowScroller>
              {({ height, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      autoHeight
                      ref={ref as any}
                      scrollTop={scrollTop}
                      deferredMeasurementCache={cache}
                      height={height}
                      width={width}
                      overscanRowCount={10}
                      rowCount={rows.length}
                      rowHeight={cache.rowHeight}
                      rowRenderer={rowRenderer}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </div>
        {isMoreRowsAvailable && <PaginationMore text={moreBtnText} />}
      </Paper>
    </div>
  );
}

export function VirtualTable<T>(props: VirtualTableProps<T>) {
  const {
    onChangePage,
    startPage,
    onSort,
    defaultSort,
    rows,
    cols,
    renderExpand,
  } = props;

  const context = useTableContext({
    onChangePage,
    startPage,
    onSort,
    defaultSort,
    rows,
    cols,
    renderExpand,
  });

  useEffect(() => {
    context.recalculateRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.expandedRow]);

  if (cols.length === 0) {
    // eslint-disable-next-line no-console
    console.error('VirtualTable: no cols passed');
    return null;
  }

  return (
    <TableContext.Provider value={context}>
      <VirtualTableInternal {...props} />
    </TableContext.Provider>
  );
}
