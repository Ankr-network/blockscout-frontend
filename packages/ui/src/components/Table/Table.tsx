import { Fragment, useMemo } from 'react';
import {
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Table as MuiTable,
  Box,
} from '@material-ui/core';
import { useStyles } from './useStyles';
import { TableProps } from './types';
import {
  HeadCell,
  BodyCell,
  useTableContext,
  TableContext,
  ExpandedRow,
  PaginationMore,
  DEFAULT_MIN_HEIGHT,
} from './utils';
import { Preloader } from '../Preloader';

export function Table<T extends Record<string, any>>({
  cols,
  minWidth,
  rows,
  pagination,
  onChangePage,
  defaultSort,
  onSort,
  startPage,
  renderExpand,
  moreBtnText,
  isLoading,
  minHeight,
  isMoreRowsAvailable,
}: TableProps<T>) {
  const classes = useStyles();
  const context = useTableContext({
    onChangePage,
    startPage,
    onSort,
    defaultSort,
  });

  const internalRows = useMemo(() => rows, [rows]);

  return (
    <TableContext.Provider value={context}>
      <TableContainer
        component={Paper}
        className={classes.root}
        style={{ minHeight: isLoading ? minHeight || DEFAULT_MIN_HEIGHT : 0 }}
      >
        {isLoading && (
          <div className={classes.overlayLoader}>
            <Preloader />
          </div>
        )}
        <Box component={MuiTable} className={classes.table} minWidth={minWidth}>
          <TableHead className={classes.thead}>
            <TableRow className={classes.row}>
              {cols.map(column => (
                <HeadCell key={column.field} {...column} />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {internalRows.map((row, index) => (
              <Fragment key={index}>
                <TableRow className={classes.row}>
                  {cols.map(column => (
                    <BodyCell
                      key={column.field}
                      index={index}
                      rowData={row}
                      column={column}
                    />
                  ))}
                </TableRow>
                {context.expands[index] && (
                  <ExpandedRow
                    renderExpand={renderExpand}
                    colsLength={cols.length}
                    rowData={row}
                  />
                )}
              </Fragment>
            ))}

            {isMoreRowsAvailable &&
              internalRows.length > 0 &&
              pagination === 'more' && (
                <PaginationMore text={moreBtnText} colsLength={cols.length} />
              )}
          </TableBody>
        </Box>
      </TableContainer>
    </TableContext.Provider>
  );
}
