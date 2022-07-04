import { useQuery } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';

import { t } from 'common';

import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { Token } from 'modules/common/types/token';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import {
  ITxEventsHistoryData,
  ITxEventsHistoryGroupItem,
} from 'modules/dashboard/screens/Dashboard/types';
import { fetchTxHistory } from 'modules/stake-polkadot/actions/fetchTxHistory';
import { ETxTypes } from 'modules/stake-polkadot/api/PolkadotStakeSDK';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
  TPolkadotETHToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { getPolkadotTxLink } from 'modules/stake-polkadot/utils/getPolkadotTxLink';
import { useAppDispatch } from 'store/useAppDispatch';

type TGetCompletedTransactionsData =
  | HistoryDialogData['staked']
  | HistoryDialogData['unstaked'];

interface IGetCompletedTransactionsProps {
  data?: ITxEventsHistoryGroupItem[];
  network: EPolkadotNetworks;
  type: ETxTypes;
}

export interface ITxHistoryData {
  hasHistory: boolean;
  isHistoryDataLoading: boolean;
  pendingUnstakeHistory: IPendingTableRow[];
  transactionHistory: HistoryDialogData;
  txHistory: ITxEventsHistoryData | null;
  handleLoadTxHistory: () => void;
}

const getCompletedTransactions = ({
  data,
  network,
  type,
}: IGetCompletedTransactionsProps): TGetCompletedTransactionsData => {
  if (!Array.isArray(data) || !data.length) {
    return [];
  }

  return data
    .filter(({ txType }) => txType === type)
    .map(({ txAmount, txDate, txHash }) => ({
      amount: txAmount,
      date: txDate,
      hash: txHash,
      // TODO Add ETH supporting for the "Unstake" too (Polkadot History)
      link: getPolkadotTxLink(network, txHash),
    }));
};

/**
 *  TODO Please to check of this a beta version logic (Polkadot Staking)
 */
export const useStakedPolkadotTxHistory = (
  network: EPolkadotNetworks,
): ITxHistoryData => {
  const dispatch = useAppDispatch();

  const { data, loading: isHistoryDataLoading } =
    useQuery<ITxEventsHistoryData>({
      type: fetchTxHistory,
      requestKey: getPolkadotRequestKey(network),
    });

  const ethToken = useMemo(
    () => EPolkadotETHReverseMap[network] as unknown as TPolkadotETHToken,
    [network],
  );

  const polkadotToken = useMemo(() => Token[network], [network]);

  const staked = useMemo(
    () =>
      getCompletedTransactions({
        data: data?.completed,
        network,
        type: ETxTypes.Staked,
      }),
    [data?.completed, network],
  );

  const unstaked = useMemo(
    () =>
      getCompletedTransactions({
        data: data?.completed,
        network,
        type: ETxTypes.Unstaked,
      }),
    [data?.completed, network],
  );

  const pendingUnstakeHistory = useMemo((): IPendingTableRow[] => {
    if (!Array.isArray(data?.pending) || !data.pending.length) {
      return [];
    }

    return data.pending.map(({ txAmount, txDate }, idx): IPendingTableRow => {
      const date = t('format.date', { value: txDate });
      const time = t('format.time-short', { value: txDate });

      return {
        id: idx + 1,
        amount: txAmount,
        timerSlot: `${date}, ${time}`,
        token: ethToken,
      };
    });
  }, [data?.pending, ethToken]);

  const hasHistory = useMemo(
    () => !!staked?.length || !!unstaked?.length,
    [staked?.length, unstaked?.length],
  );

  const handleLoadTxHistory = useCallback((): void => {
    dispatch(fetchTxHistory(network));
  }, [dispatch, network]);

  return {
    hasHistory,
    isHistoryDataLoading,
    pendingUnstakeHistory,
    transactionHistory: {
      staked,
      stakedToken: polkadotToken,
      unstaked,
      unstakedToken: ethToken,
    },
    txHistory: data,
    handleLoadTxHistory,
  };
};
