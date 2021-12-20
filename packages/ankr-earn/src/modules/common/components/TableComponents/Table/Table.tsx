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
  'dense' | 'paddingCollapse' | 'customCell' | 'alignCell' | 'stickyHeader'
>;

export const TableContext = createPureContext<TableContextType>({
  count: 0,
} as TableContextType);

interface ITableComponentProps extends ICustomProps, IStyleProps {
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
}: ITableComponentProps) => {
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

export type ITableProps = ITableComponentProps;

export const Table = (props: ITableProps) => {
  return (
    <TableContext.Provider
      value={{
        dense: props.dense,
        paddingCollapse: props.dense || props.paddingCollapse,
        customCell: props.customCell,
        alignCell: props.alignCell,
        count: props.columnsCount,
        stickyHeader: props.stickyHeader,
      }}
    >
      <TableComponent {...props} />
    </TableContext.Provider>
  );
};
