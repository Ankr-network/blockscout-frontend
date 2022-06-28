import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
import { ReactNode, useCallback, useContext, useState } from 'react';

import { TableContext } from '../Table/Table';
import { TableBodyCell } from '../TableBodyCell';
import { ICustomProps, IStyleProps } from '../types';

import { ReactComponent as ExpandIcon } from './assets/expand-icon.svg';
import { useTableRowStyles } from './useTableRowStyles';

interface ITableRowProps {
  className?: string;
  hover?: boolean;
  children: ReactNode;
  expandSlot?: ReactNode;
}

export const TableRowComponent = ({
  className,
  hover,
  children,
  expandable = false,
  expandSlot,
  count,
  customCell,
}: ITableRowProps &
  ICustomProps &
  IStyleProps & { count: number }): JSX.Element => {
  const classes = useTableRowStyles({
    count,
    customCell,
    expandable,
  });

  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(opened => !opened);
  }, [setIsOpened]);

  const icon = isOpened ? (
    <ExpandIcon className={classes.invertedIcon} />
  ) : (
    <ExpandIcon />
  );

  return (
    <>
      <tr
        className={classNames(
          className,
          classes.row,
          hover && classes.rowHovered,
          isOpened && classes.expandedRow,
        )}
      >
        {children}

        {expandable && (
          <TableBodyCell label=" ">
            {expandSlot && (
              <IconButton className={classes.iconWrap} onClick={handleOpen}>
                {icon}
              </IconButton>
            )}
          </TableBodyCell>
        )}
      </tr>

      {isOpened && (
        <tr className={classNames(classes.row, classes.expandedSlot)}>
          <td>{expandSlot}</td>
        </tr>
      )}
    </>
  );
};

export const TableRow = (
  props: Omit<ITableRowProps, 'tableWidth'>,
): JSX.Element => {
  const context = useContext(TableContext);
  return <TableRowComponent {...context} {...props} />;
};
