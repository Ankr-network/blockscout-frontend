import classNames from 'classnames';
import React, { ReactNode, useContext } from 'react';

import { TableContext } from '../Table/Table';
import { ICustomProps, IStyleProps } from '../types';

import { useTableHeadStyles } from './useTableHeadStyles';

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
  dense,
}: ITableHeadProps &
  ICustomProps &
  IStyleProps & { count: number }): JSX.Element => {
  const classes = useTableHeadStyles({
    count,
    customCell,
    paddingCollapse,
    dense,
  });

  return (
    <thead
      className={classNames(
        classes.head,
        className,
        stickyHeader && classes.headSticky,
        !dense && classes.headWithBg,
      )}
    >
      <tr className={classes.row}>{children}</tr>
    </thead>
  );
};

export const TableHead = (props: ITableHeadProps): JSX.Element => {
  const context = useContext(TableContext);
  return <TableHeadComponent {...context} {...props} />;
};
