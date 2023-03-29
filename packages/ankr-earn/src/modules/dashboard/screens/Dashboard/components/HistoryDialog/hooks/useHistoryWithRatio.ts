import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { ITxHistoryItem } from '@ankr.com/staking-sdk';

interface IHistoryWithPendingStatusArgs {
  history?: ITxHistoryItem[];
  ratio?: BigNumber.Value;
}

/**
 * TxAmount is multiplied by ratio for certificate tokens.
 *
 * @return  {ITxHistoryItem[]}
 */
export const useHistoryWithRatio = ({
  history = [],
  ratio = 1,
}: IHistoryWithPendingStatusArgs): ITxHistoryItem[] => {
  return useMemo(
    () => history.map(item => mapHistory(item, ratio)),
    [history, ratio],
  );
};

/**
 * Return history item with txAmount multiplied by ratio.
 *
 * @param {ITxHistoryItem} item - history item
 * @param {BigNumber.Value} ratio - certificate ratio
 * @return  {ITxHistoryItem}
 */
function mapHistory(
  item: ITxHistoryItem,
  ratio: BigNumber.Value,
): ITxHistoryItem {
  const txAmount = item.isBond
    ? item.txAmount
    : item.txAmount.multipliedBy(ratio);

  return {
    ...item,
    txAmount,
  };
}
