import { Paper } from '@material-ui/core';
import classNames from 'classnames';
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
  const {
    minWidth,
    minHeight,
    moreBtnText,
    isMoreRowsAvailable,
    classes: tableClasses,
  } = props;
  const classes = useStyles();
  const { cache, ref, rows } = useTable();
  const rowRenderer = useRowRenderer();

  return (
    <div className={classNames(classes.root, tableClasses?.root)}>
      <Paper
        className={classNames(classes.container, tableClasses?.container)}
        style={{ minWidth, minHeight }}
      >
        <TableHead />
        <div className={classes.listContainer}>
          <WindowScroller>
            {({
              height,
              scrollTop,
              isScrolling,
              onChildScroll,
              registerChild,
            }) => {
              return (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <div ref={registerChild}>
                      <List
                        autoHeight
                        ref={ref as any}
                        scrollTop={scrollTop}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        deferredMeasurementCache={cache}
                        height={height}
                        width={width}
                        overscanRowCount={10}
                        rowCount={rows.length}
                        rowHeight={cache.rowHeight}
                        rowRenderer={rowRenderer}
                      />
                    </div>
                  )}
                </AutoSizer>
              );
            }}
          </WindowScroller>
        </div>
        {isMoreRowsAvailable && <PaginationMore text={moreBtnText} />}
      </Paper>
    </div>
  );
}

export function VirtualTable<T>(props: VirtualTableProps<T>) {
  const { onChangePage, onSort, rows, cols, renderExpand, defaultQuery } =
    props;

  const context = useTableContext({
    onChangePage,
    onSort,
    rows,
    cols,
    defaultQuery,
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
