import classNames from 'classnames';
import React, { useContext } from 'react';
import { WithUseStyles } from 'ui';
import { TableContext } from '../Table/Table';
import { AlignType, IStyleProps } from '../types';
import { useTableHeadCellStyles } from './useTableHeadCellStyles';

interface ITableHeadCellProps
  extends Partial<WithUseStyles<typeof useTableHeadCellStyles>> {
  className?: string;
  label: React.ReactNode;
  align?: AlignType;
}

const TableHeadCellComponent = (props: ITableHeadCellProps & IStyleProps) => {
  const { className, alignCell, align, label } = props;

  const classes = useTableHeadCellStyles(props);

  return (
    <div
      className={classNames(
        classes.cell,
        classes.headCell,
        (alignCell === 'center' || align === 'center') && classes.centerCell,
        (alignCell === 'right' || align === 'right') && classes.rightCell,
        (alignCell === 'left' || align === 'left') && classes.leftCell,
        className,
      )}
      role="cell"
    >
      <div className={classes.content}>{label}</div>
    </div>
  );
};

export const TableHeadCell = (props: ITableHeadCellProps) => {
  const context = useContext(TableContext);
  return <TableHeadCellComponent {...context} {...props} />;
};
