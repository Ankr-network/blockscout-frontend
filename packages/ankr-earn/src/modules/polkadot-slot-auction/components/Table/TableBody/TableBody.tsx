import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { TableContext } from '../Table/Table';
import { ICustomProps, IStyleProps } from '../types';
import { useTableBodyStyles } from './useTableBodyStyles';

interface ITableBodyProps {
  className?: string;
  children: ReactNode;
}

export const TableBodyComponent = ({
  className,
  children,
  count,
  customCell,
  dense,
  paddingCollapse,
}: ITableBodyProps & ICustomProps & IStyleProps & { count: number }) => {
  const classes = useTableBodyStyles({
    count,
    customCell,
    paddingCollapse,
    dense,
  });

  return (
    <div className={classNames(classes.bodyWrapper, className)}>{children}</div>
  );
};

export const TableBody = (props: ITableBodyProps) => {
  const context = useContext(TableContext);
  return <TableBodyComponent {...context} {...props} />;
};
