import { useQuery } from '@redux-requests/react';
import { useMemo } from 'react';

import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { ITxEventsHistoryGroupItem } from 'modules/dashboard/screens/Dashboard/types';
import { IHistoryTableRow } from 'modules/dashboard/types';
import { fetchTxHistory } from 'modules/stake-polkadot/actions/fetchTxHistory';
import { ETxTypes } from 'modules/stake-polkadot/api/PolkadotStakeSDK';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getPolkadotTxLink } from 'modules/stake-polkadot/utils/getPolkadotTxLink';
import { useAppDispatch } from 'store/useAppDispatch';

interface IPolkadotHistoryData {
  isHistoryDataLoading: boolean;
  stakedHistory: IHistoryTableRow[];
  unstakedHistory: IHistoryTableRow[];
}

export const usePolkadotHistory = (
  network: EPolkadotNetworks,
): IPolkadotHistoryData => {
  const dispatch = useAppDispatch();

  const { data: historyData, loading: isHistoryDataLoading } = useQuery({
    type: fetchTxHistory,
    requestKey: getPolkadotRequestKey(network),
  });

  const stakedHistory = useMemo(
    () =>
      getCompletedTransactions({
        data: historyData?.completed,
        network,
        type: ETxTypes.Staked,
      }),
    [historyData?.completed, network],
  );

  const unstakedHistory = useMemo(
    () =>
      getCompletedTransactions({
        data: historyData?.completed,
        network,
        type: ETxTypes.Unstaked,
      }),
    [historyData?.completed, network],
  );

  useInitEffect(() => {
    dispatch(fetchTxHistory(network));
  });

  return {
    isHistoryDataLoading,
    stakedHistory,
    unstakedHistory,
  };
};

interface IGetCompletedTransactionsArgs {
  data?: ITxEventsHistoryGroupItem[];
  network: EPolkadotNetworks;
  type: ETxTypes;
}

function getCompletedTransactions({
  data = [],
  network,
  type,
}: IGetCompletedTransactionsArgs): IHistoryTableRow[] {
  const mapHistoryItemToTableRow = ({
    txAmount,
    txDate,
    txHash,
  }: ITxEventsHistoryGroupItem): IHistoryTableRow => {
    return {
      amount: txAmount,
      date: txDate,
      hash: txHash,
      // TODO Add ETH supporting for the "Unstake" too (Polkadot History)
      link: getPolkadotTxLink(network, txHash),
    };
  };

  return data
    .filter(({ txType }) => txType === type)
    .map(mapHistoryItemToTableRow);
}
