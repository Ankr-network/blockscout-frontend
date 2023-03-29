import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { ITxHistoryItem } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { getIsBondByToken } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/utils/getIsBond';
import { getNetworkByToken } from 'modules/dashboard/screens/Dashboard/components/HistoryDialog/utils/getNetworkByToken';
import { IHistoryTableRow } from 'modules/dashboard/types';
import { getUnstakeHistoryWithPendingStatus } from 'modules/stake/utils/getUnstakeHistoryWithPendingStatus';

import { useHistoryWithRatio } from './useHistoryWithRatio';

interface IUseHistoryTableArgs {
  token: Token;
  stakeHistory?: ITxHistoryItem[];
  unstakeHistory?: ITxHistoryItem[];
  ratio?: BigNumber;
  pendingUnstakes?: BigNumber;
}

interface IUseHistoryTable {
  stakeTableData: IHistoryTableRow[];
  unstakeTableData: IHistoryTableRow[];
}

export const useHistoryTable = ({
  token,
  stakeHistory,
  unstakeHistory,
  ratio,
  pendingUnstakes,
}: IUseHistoryTableArgs): IUseHistoryTable => {
  const unstakeHistoryWithPendingStatus = useMemo(
    () => getUnstakeHistoryWithPendingStatus(unstakeHistory, pendingUnstakes),
    [unstakeHistory, pendingUnstakes],
  );

  const stakeHistoryWithRatio = useHistoryWithRatio({
    ratio,
    history: stakeHistory,
  });

  const unstakeHistoryWithRatio = useHistoryWithRatio({
    ratio,
    history: unstakeHistoryWithPendingStatus,
  });

  const networkByToken = getNetworkByToken(token);
  const isBond = getIsBondByToken(token);

  const mapHistory = useCallback(
    (item: ITxHistoryItem): IHistoryTableRow => ({
      link: getTxLinkByNetwork(item.txHash, networkByToken),
      hash: item.txHash,
      amount: item.txAmount,
      date: item.txDate,
    }),
    [networkByToken],
  );

  const unstakeTableData = useMemo(
    () =>
      unstakeHistoryWithRatio
        .filter(item => item.isBond === isBond && !item.isPending)
        .map(mapHistory),
    [isBond, mapHistory, unstakeHistoryWithRatio],
  );

  const stakeTableData = useMemo(
    () =>
      stakeHistoryWithRatio
        .filter(item => item.isBond === isBond && !item.isPending)
        .map(mapHistory),
    [isBond, mapHistory, stakeHistoryWithRatio],
  );

  return {
    stakeTableData,
    unstakeTableData,
  };
};
