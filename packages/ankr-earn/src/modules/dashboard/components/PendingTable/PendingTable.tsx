import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ReactNode, ReactText } from 'react';

import { t } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';

import { usePendingTableStyles } from './usePendingTableStyles';

export interface IPendingTableRow {
  id: ReactText;
  amount: BigNumber;
  token: string;
  timerSlot: ReactNode;
}

interface IPendingTableProps {
  data: IPendingTableRow[];
}

export const PendingTable = ({
  data,
}: IPendingTableProps): JSX.Element | null => {
  const classes = usePendingTableStyles();

  const captions = [t('dashboard.pending-amount'), t('dashboard.pending-time')];

  if (data.length === 0) {
    return null;
  }

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.tr}>
          {captions.map(caption => (
            <th key={caption} className={classNames(classes.th, classes.tCell)}>
              {caption}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map(({ amount, timerSlot, id, token }) => (
          <tr key={id} className={classes.tr}>
            <td
              className={classNames(classes.td, classes.tCell)}
              title={amount.toFormat()}
            >
              {t('unit.token-value', {
                token,
                value: amount.decimalPlaces(DEFAULT_ROUNDING).toFormat(),
              })}
            </td>

            <td className={classNames(classes.td, classes.tCell)}>
              {timerSlot}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
