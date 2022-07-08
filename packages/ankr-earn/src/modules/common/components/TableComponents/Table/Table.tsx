import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { createPureContext } from 'react-shallow-context';

import { ICustomProps, IStyleProps } from '../types';

import { useTableStyles } from './useTableStyles';

type TableContextType = {
  count: number;
} & Pick<
  ITableComponentProps,
  | 'dense'
  | 'paddingCollapse'
  | 'customCell'
  | 'alignCell'
  | 'stickyHeader'
  | 'expandable'
>;

export const TableContext = createPureContext<TableContextType>({
  count: 0,
} as TableContextType);

export interface ITableComponentProps extends ICustomProps, IStyleProps {
  className?: string;
  columnsCount: number;
  children: ReactNode;
  minWidth?: string | number;
}

const TableComponent = ({
  className,
  children,
  minWidth,
  dense,
}: ITableComponentProps): JSX.Element => {
  const classes = useTableStyles({ minWidth });

  return (
    <Paper
      className={classNames(
        classes.container,
        className,
        !dense && classes.containerNoPaper,
      )}
    >
      <table className={classes.table}>{children}</table>
    </Paper>
  );
};

export const Table = ({
  dense,
  paddingCollapse,
  customCell,
  alignCell,
  columnsCount,
  stickyHeader,
  expandable,
  ...rest
}: ITableComponentProps): JSX.Element => {
  return (
    <TableContext.Provider
      value={{
        dense,
        paddingCollapse: dense || paddingCollapse,
        customCell,
        expandable,
        alignCell,
        count: columnsCount,
        stickyHeader,
      }}
    >
      <TableComponent
        alignCell={alignCell}
        columnsCount={columnsCount}
        customCell={customCell}
        dense={dense}
        paddingCollapse={paddingCollapse}
        stickyHeader={stickyHeader}
        {...rest}
      />
    </TableContext.Provider>
  );
};
