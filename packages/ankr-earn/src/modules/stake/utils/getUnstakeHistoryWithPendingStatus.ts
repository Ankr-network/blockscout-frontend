import BigNumber from 'bignumber.js';

import { ITxHistoryItem, ZERO } from '@ankr.com/staking-sdk';

/**
 * Get unstake history with pending status.
 *
 * @param {ITxHistoryItem[]} fullUnstakeHistory - full unstake history
 * @param {BigNumber} pedingAmount - total pending unstakes amount
 * @returns {Promise<ITxHistoryItem[]>}
 */
export const getUnstakeHistoryWithPendingStatus = (
  fullUnstakeHistory: ITxHistoryItem[] = [],
  pedingAmount: BigNumber = ZERO,
): ITxHistoryItem[] => {
  if (!fullUnstakeHistory.length || pedingAmount.isZero()) {
    return fullUnstakeHistory;
  }

  const sortedHistory = [...fullUnstakeHistory].sort(
    (a, b) => b.txDate.getTime() - a.txDate.getTime(),
  );

  let totalPendingUnstakes = pedingAmount;
  const historyWithPendingStatus = sortedHistory.map(item => {
    const newItem = { ...item };
    newItem.isPending = false;

    if (totalPendingUnstakes.isGreaterThan(0)) {
      totalPendingUnstakes = totalPendingUnstakes.minus(newItem.txAmount);
      newItem.isPending = true;
    }

    return newItem;
  });

  return historyWithPendingStatus;
};
