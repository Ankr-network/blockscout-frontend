import classNames from 'classnames';
import React, { CSSProperties, useContext } from 'react';

import { WithUseStyles } from 'ui';

import { TableContext } from '../Table/Table';
import { AlignType, IStyleProps } from '../types';

import { useTableBodyCellStyles } from './useTableBodyCellStyles';

interface ITableBodyCellProps
  extends Partial<WithUseStyles<typeof useTableBodyCellStyles>> {
  className?: string;
  align?: AlignType;
  children: React.ReactNode;
  style?: CSSProperties;
  label?: string;
}

export const TableBodyCellComponent = ({
  className,
  alignCell,
  align,
  dense,
  paddingCollapse,
  children,
  style,
  label,
  ...rest
}: ITableBodyCellProps & IStyleProps): JSX.Element => {
  const classes = useTableBodyCellStyles({
    dense,
    paddingCollapse,
    ...rest,
  });
  return (
    <td
      className={classNames(
        className,
        classes.tableCell,
        classes.cell,
        classes.bodyCell,
        {
          [classes.withCaption]: !!label,
          [classes.centerCell]: alignCell === 'center' || align === 'center',
          [classes.rightCell]: alignCell === 'right' || align === 'right',
          [classes.leftCell]: alignCell === 'left' || align === 'left',
        },
      )}
      data-label={label}
      role="cell"
      style={style}
    >
      <div className={classes.cellWrapper}>{children}</div>
    </td>
  );
};

export const TableBodyCell = (props: ITableBodyCellProps): JSX.Element => {
  const context = useContext(TableContext);
  return <TableBodyCellComponent {...context} {...props} />;
};
