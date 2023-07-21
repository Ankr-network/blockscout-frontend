import { useMemo } from 'react';

import { UsageHistoryData } from 'domains/dashboard/store/types';

import { HeadRow } from '../HeadRow';
import { TableRow } from '../TableRow';
import { formatData } from '../../utils/formatData';
import { useTableSyles } from './TableStyles';

export interface TableProps {
  data: UsageHistoryData[];
}

export const Table = ({ data }: TableProps) => {
  const { classes, cx } = useTableSyles();

  const formatted = useMemo(() => formatData(data), [data]);

  return (
    <div>
      <div
        className={cx({
          [classes.isHidden]: data.length > 0,
        })}
      >
        <HeadRow />
      </div>
      {formatted.map(item => (
        <TableRow data={item} key={item.month} />
      ))}
    </div>
  );
};
