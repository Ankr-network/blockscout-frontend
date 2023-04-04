import { useEffect, useMemo } from 'react';
import { Paper, Typography } from '@mui/material';
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
  useWindowScroller,
} from './utils';

function VirtualTableInternal<T extends Record<string, any>>(
  props: VirtualTableProps<T>,
) {
  const {
    classes: tableClasses,
    emptyMessage,
    initializing,
    isMoreRowsAvailable,
    minHeight,
    minWidth,
    moreBtnText,
    preloader,
  } = props;
  const { classes, cx } = useStyles();
  const { cache, ref, rows } = useTable();
  const rowRenderer = useRowRenderer();
  const isEmpty = rows.length === 0;

  const windowScrollerRef = useWindowScroller();

  const content = useMemo(() => {
    if (initializing) {
      return preloader;
    }

    if (isEmpty) {
      return (
        <Typography variant="h5" className={classes.empty}>
          {emptyMessage}
        </Typography>
      );
    }

    return (
      <WindowScroller ref={windowScrollerRef}>
        {({ height, scrollTop, isScrolling, onChildScroll, registerChild }) => {
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
    );
  }, [
    cache,
    classes.empty,
    emptyMessage,
    isEmpty,
    initializing,
    preloader,
    ref,
    rowRenderer,
    rows.length,
    windowScrollerRef,
  ]);

  return (
    <div className={cx(classes.root, tableClasses?.root)}>
      <Paper
        className={cx(classes.container, tableClasses?.container)}
        style={{ minWidth, minHeight }}
      >
        <TableHead className={tableClasses?.head} />
        <div className={classes.listContainer}>{content}</div>
        {isMoreRowsAvailable && <PaginationMore text={moreBtnText} />}
      </Paper>
    </div>
  );
}

export function VirtualTable<T extends Record<string, any>>(
  props: VirtualTableProps<T>,
) {
  const { onChangePage, onSort, rows, cols, renderExpand, loading } = props;

  const context = useTableContext({
    cols,
    loading,
    onChangePage,
    onSort,
    renderExpand,
    rows,
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
