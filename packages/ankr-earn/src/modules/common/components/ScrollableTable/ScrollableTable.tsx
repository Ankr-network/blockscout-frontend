import classNames from 'classnames';
import { ReactNode } from 'react';

import { ReactComponent as IconArrowDown } from './assets/icon-arrow-down.svg';
import { useStyle } from './ScrollableTableStyles';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface HeadCellProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  align?: 'left' | 'center' | 'right';
  sortDirection?: 'asc' | 'desc' | null;
}

interface CellProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  noWrap?: boolean;
}

export function ScrollableTable({
  children,
  className,
  ...rest
}: Props): JSX.Element {
  const styles = useStyle();

  return (
    <div className={classNames(styles.root, className)} {...rest}>
      <table className={styles.table}>{children}</table>
    </div>
  );
}

function Head({ children, ...rest }: Props) {
  return <thead {...rest}>{children}</thead>;
}

function HeadCell({
  children,
  className,
  align = 'left',
  sortDirection,
  onClick,
  ...rest
}: HeadCellProps) {
  const styles = useStyle();

  return (
    <th
      align={align}
      className={classNames(styles.th, className, {
        [styles.hasCursor]: onClick,
      })}
      onClick={onClick}
      {...rest}
    >
      {sortDirection !== undefined ? (
        <div className={styles.thContent}>
          <div>{children}</div>

          <IconArrowDown
            className={classNames({
              [styles.iconArrowRotated]: sortDirection === 'asc',
            })}
          />
        </div>
      ) : (
        children
      )}
    </th>
  );
}

function Body({ children, ...rest }: Props) {
  return <tbody {...rest}>{children}</tbody>;
}

function HeadRow({ children, ...rest }: Props) {
  return <tr {...rest}>{children}</tr>;
}

function Row({ children, className, ...rest }: Props) {
  const styles = useStyle();

  return (
    <tr className={classNames(styles.tr, className)} {...rest}>
      {children}
    </tr>
  );
}

function Cell({ children, className, noWrap, ...rest }: CellProps) {
  const styles = useStyle();

  return (
    <td
      className={classNames(styles.td, className)}
      {...rest}
      style={{ whiteSpace: noWrap ? 'nowrap' : 'normal' }}
    >
      {children}
    </td>
  );
}

ScrollableTable.Head = Head;
ScrollableTable.HeadRow = HeadRow;
ScrollableTable.HeadCell = HeadCell;
ScrollableTable.Body = Body;
ScrollableTable.Row = Row;
ScrollableTable.Cell = Cell;
