import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { ReactNode, ReactText } from 'react';

import { DEFAULT_FIXED } from 'modules/common/const';
import { getTokenName } from 'modules/common/utils/getTokenName';

import { usePendingTableStyles } from './usePendingTableStyles';

export interface IPendingTableRow {
  id: ReactText;
  amount: BigNumber;
  token: string;
  timerSlot: ReactNode;
}

interface IPendingTableProps {
  data: IPendingTableRow[];
  unstakeLabel: string;
}

export const PendingTable = ({
  data,
  unstakeLabel,
}: IPendingTableProps): JSX.Element | null => {
  const classes = usePendingTableStyles();

  const captions = [t('dashboard.pending-time'), t('dashboard.pending-amount')];

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
            <td className={classNames(classes.td, classes.tCell)}>
              {timerSlot}
            </td>

            <td
              className={classNames(classes.td, classes.tCell)}
              title={amount.toFormat()}
            >
              {t('unit.token-value', {
                token: getTokenName(token),
                value: amount.decimalPlaces(DEFAULT_FIXED).toFormat(),
              })}
            </td>
          </tr>
        ))}

        {unstakeLabel && (
          <tr className={classNames(classes.tr, classes.informer)}>
            <td className={classNames(classes.td, classes.tCell)} colSpan={2}>
              {unstakeLabel}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
