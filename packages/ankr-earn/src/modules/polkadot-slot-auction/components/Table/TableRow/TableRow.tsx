import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { TableContext } from '../Table/Table';
import { ICustomProps, IStyleProps } from '../types';
import { useTableRowStyles } from './useTableRowStyles';

interface ITableRowProps {
  className?: string;
  hover?: boolean;
  children: ReactNode;
}

export const TableRowComponent = ({
  className,
  children,
  count,
  customCell,
  dense,
  paddingCollapse,
  hover,
}: ITableRowProps & ICustomProps & IStyleProps & { count: number }) => {
  const classes = useTableRowStyles({
    count,
    customCell,
    paddingCollapse,
    dense,
  });

  return (
    <div className={classes.wrapper}>
      <ul
        className={classNames(
          className,
          classes.row,
          hover && classes.rowHovered,
        )}
        role="row"
      >
        {children}
      </ul>
    </div>
  );
};

export const TableRow = (props: Omit<ITableRowProps, 'tableWidth'>) => {
  const context = useContext(TableContext);
  return <TableRowComponent {...context} {...props} />;
};
