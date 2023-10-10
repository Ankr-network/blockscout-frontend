import { useMemo } from 'react';

import { HeadRow } from '../HeadRow';
import { TableRow } from '../TableRow';
import { formatData } from '../../utils/formatData';
import { useTableSyles } from './TableStyles';
import { UsageHistoryData } from '../../../../types';

export interface TableProps {
  data: UsageHistoryData[];
  headingTitles: string[];
}

export const Table = ({ data, headingTitles }: TableProps) => {
  const { classes, cx } = useTableSyles();

  const formatted = useMemo(() => formatData(data), [data]);

  return (
    <div>
      <div
        className={cx({
          [classes.isHidden]: data.length > 0,
        })}
      >
        <HeadRow headingTitles={headingTitles} />
      </div>
      {formatted.map(item => (
        <TableRow data={item} key={item.month} />
      ))}
    </div>
  );
};
