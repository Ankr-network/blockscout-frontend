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
  smallFont?: boolean;
}

const TableHeadCellComponent = ({
  className,
  alignCell,
  align,
  label,
  dense,
  paddingCollapse,
  smallFont = false,
}: ITableHeadCellProps & IStyleProps): JSX.Element => {
  const classes = useTableHeadCellStyles({
    dense,
    paddingCollapse,
    smallFont,
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

export const TableHeadCell = (props: ITableHeadCellProps): JSX.Element => {
  const context = useContext(TableContext);
  return <TableHeadCellComponent {...context} {...props} />;
};
