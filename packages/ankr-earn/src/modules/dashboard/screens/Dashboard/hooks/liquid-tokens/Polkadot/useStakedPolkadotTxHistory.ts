import { t } from '@ankr.com/common';
import { useQuery } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';

import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { ITxEventsHistoryData } from 'modules/dashboard/screens/Dashboard/types';
import { fetchTxHistory } from 'modules/stake-polkadot/actions/fetchTxHistory';
import {
  EPolkadotETHReverseMap,
  EPolkadotNetworks,
  TPolkadotETHToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { useAppDispatch } from 'store/useAppDispatch';

export interface ITxHistoryData {
  isHistoryDataLoading: boolean;
  pendingUnstakeHistory: IPendingTableRow[];
  handleLoadTxHistory: () => void;
}

export const useStakedPolkadotTxHistory = (
  network: EPolkadotNetworks,
): ITxHistoryData => {
  const dispatch = useAppDispatch();

  const { data: historyData, loading: isHistoryDataLoading } =
    useQuery<ITxEventsHistoryData>({
      type: fetchTxHistory,
      requestKey: getPolkadotRequestKey(network),
    });

  const ethToken = useMemo(
    () => EPolkadotETHReverseMap[network] as unknown as TPolkadotETHToken,
    [network],
  );

  const pendingUnstakeHistory = useMemo((): IPendingTableRow[] => {
    if (!Array.isArray(historyData?.pending) || !historyData.pending.length) {
      return [];
    }

    return historyData.pending.map(
      ({ txAmount, txDate }, idx): IPendingTableRow => {
        const date = t('format.date', { value: txDate });
        const time = t('format.time-short', { value: txDate });

        return {
          id: idx + 1,
          amount: txAmount,
          timerSlot: `${date}, ${time}`,
          token: ethToken,
        };
      },
    );
  }, [historyData?.pending, ethToken]);

  const handleLoadTxHistory = useCallback((): void => {
    dispatch(fetchTxHistory(network));
  }, [dispatch, network]);

  return {
    isHistoryDataLoading,
    pendingUnstakeHistory,
    handleLoadTxHistory,
  };
};
