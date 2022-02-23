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
}: ITableBodyProps &
  ICustomProps &
  IStyleProps & { count: number }): JSX.Element => {
  const classes = useTableBodyStyles({
    count,
    customCell,
  });

  return (
    <tbody className={classNames(classes.body, className)}>{children}</tbody>
  );
};

export const TableBody = (props: ITableBodyProps): JSX.Element => {
  const context = useContext(TableContext);
  return <TableBodyComponent {...context} {...props} />;
};
