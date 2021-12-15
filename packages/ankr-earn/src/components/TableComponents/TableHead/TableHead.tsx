import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';
import { TableContext } from '../Table/Table';
import { ICustomProps, IStyleProps } from '../types';
import { useTableHeadStyles } from './TableHeadStyles';

interface ITableHeadProps {
  className?: string;
  children: ReactNode;
}

export const TableHeadComponent = ({
  className,
  children,
  customCell,
  paddingCollapse,
  count,
  stickyHeader,
}: ITableHeadProps & ICustomProps & IStyleProps & { count: number }) => {
  const classes = useTableHeadStyles({
    count,
    customCell,
    paddingCollapse,
  });

  return (
    <div
      className={classNames(
        classes.head,
        className,
        stickyHeader && classes.headSticky,
      )}
      role="rowgroup"
    >
      <div className={classes.row} role="row">
        {children}
      </div>
    </div>
  );
};

export const TableHead = (props: ITableHeadProps) => {
  const context = useContext(TableContext);
  return <TableHeadComponent {...context} {...props} />;
};
