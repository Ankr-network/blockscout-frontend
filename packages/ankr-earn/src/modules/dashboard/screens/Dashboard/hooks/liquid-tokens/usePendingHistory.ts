import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { ITxHistoryItem } from '@ankr.com/staking-sdk';

import { ONE, ZERO } from 'modules/common/const';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { useLocaleCallback } from 'modules/i18n/hooks/useLocaleCallback';
import { getUnstakeHistoryWithPendingStatus } from 'modules/stake/utils/getUnstakeHistoryWithPendingStatus';

export interface IPendingHistoryData {
  /**
   * List of pending bond unstakes.
   */
  pendingBondUnstakeHistory: IPendingTableRow[];
  /**
   * List of pending certificate unstakes.
   */
  pendingCertUnstakeHistory: IPendingTableRow[];
  /**
   * Total pending bond unstake amount.
   */
  pendingBondAmount: BigNumber;
  /**
   * Total pending cert unstake amount.
   */
  pendingCertAmount: BigNumber;
}

interface IUsePendingHistoryArgs {
  unstakeHistory?: ITxHistoryItem[];
  certRatio?: BigNumber;
  pendingAmount?: BigNumber;
  bondTokenName: string;
  certTokenName: string;
}

/**
 * Returns pending history data. Pending history data is a part of unstake history.
 * It is a list of pending unstakes. Pending unstakes are unstakes that are not
 * yet completed. Pending unstakes are displayed in the
 * Pending table.
 */
export const usePendingHistory = ({
  unstakeHistory = [],
  certRatio = ONE,
  pendingAmount = ZERO,
  bondTokenName,
  certTokenName,
}: IUsePendingHistoryArgs): IPendingHistoryData => {
  const unstakeHistoryWithPendingStatus = useMemo(
    () => getUnstakeHistoryWithPendingStatus(unstakeHistory, pendingAmount),
    [unstakeHistory, pendingAmount],
  );

  const mapPendingRow = useLocaleCallback(
    ({
      txDate,
      isBond,
      txHash,
      txAmount,
    }: ITxHistoryItem): IPendingTableRow => {
      const date = t('format.date', { value: txDate });
      const time = t('format.time-short', { value: txDate });

      return {
        id: txHash,
        amount: isBond ? txAmount : txAmount.multipliedBy(certRatio),
        token: isBond ? bondTokenName : certTokenName,
        timerSlot: `${date}, ${time}`,
      };
    },
    [certRatio, bondTokenName, certTokenName],
  );

  const [pendingBondUnstakeHistory, pendingCertUnstakeHistory] = useMemo(
    () =>
      unstakeHistoryWithPendingStatus.reduce(
        (result, item) => {
          if (!item.isPending) {
            return result;
          }

          if (item.isBond) {
            result[0].push(mapPendingRow(item));
          } else {
            result[1].push(mapPendingRow(item));
          }

          return result;
        },
        [[], []] as IPendingTableRow[][],
      ),
    [mapPendingRow, unstakeHistoryWithPendingStatus],
  );

  const pendingBondAmount = useMemo(
    () => getUnstakeAmount(pendingBondUnstakeHistory),
    [pendingBondUnstakeHistory],
  );

  const pendingCertAmount = useMemo(
    () => getUnstakeAmount(pendingCertUnstakeHistory),
    [pendingCertUnstakeHistory],
  );

  return {
    pendingBondUnstakeHistory,
    pendingCertUnstakeHistory,
    pendingBondAmount,
    pendingCertAmount,
  };
};

function getUnstakeAmount(unstakeHistory: IPendingTableRow[]): BigNumber {
  return unstakeHistory.reduce(
    (result, item) => result.plus(item.amount),
    ZERO,
  );
}
