import classNames from 'classnames';
import { WithUseStyles } from 'ui';
import React, { useContext } from 'react';
import { TableContext } from '../Table/Table';
import { AlignType, IStyleProps } from '../types';
import { useTableHeadCellStyles } from './useTableHeadCellStyles';

interface ITableHeadCellProps
  extends Partial<WithUseStyles<typeof useTableHeadCellStyles>> {
  className?: string;
  label: React.ReactNode;
  align?: AlignType;
}

const TableHeadCellComponent = ({
  className,
  alignCell,
  align,
  label,
  dense,
  paddingCollapse,
}: ITableHeadCellProps & IStyleProps) => {
  const classes = useTableHeadCellStyles({
    dense,
    paddingCollapse,
  });

  return (
    <th
      className={classNames(
        classes.cell,
        classes.headCell,
        (alignCell === 'center' || align === 'center') && classes.centerCell,
        (alignCell === 'right' || align === 'right') && classes.rightCell,
        (alignCell === 'left' || align === 'left') && classes.leftCell,
        className,
      )}
    >
      <div className={classes.content}>{label}</div>
    </th>
  );
};

export const TableHeadCell = (props: ITableHeadCellProps) => {
  const context = useContext(TableContext);
  return <TableHeadCellComponent {...context} {...props} />;
};
