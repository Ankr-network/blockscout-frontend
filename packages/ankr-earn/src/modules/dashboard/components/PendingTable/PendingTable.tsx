import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import React, { ReactNode, ReactText } from 'react';
import { usePendingTableStyles } from './usePendingTableStyles';

export interface IPendingTableRow {
  id: ReactText;
  amount: string;
  timerSlot: ReactNode;
}

interface IPendingTableProps {
  data: IPendingTableRow[];
}

export const PendingTable = ({ data }: IPendingTableProps) => {
  const classes = usePendingTableStyles();

  const captions = [t('dashboard.pending-amount'), t('dashboard.pending-time')];

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.tr}>
          {captions.map(caption => (
            <th className={classNames(classes.th, classes.tCell)} key={caption}>
              {caption}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map(({ amount, timerSlot, id }) => (
          <tr className={classes.tr} key={id}>
            <td className={classNames(classes.td, classes.tCell)}>{amount}</td>
            <td className={classNames(classes.td, classes.tCell)}>
              {timerSlot}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
