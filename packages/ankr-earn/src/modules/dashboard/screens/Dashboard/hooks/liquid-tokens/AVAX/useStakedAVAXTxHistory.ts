import { t } from '@ankr.com/common';
import { useCallback, useMemo } from 'react';

import { EAvalanchePoolEventsMap } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { useLazyGetAVAXTotalHistoryDataQuery } from 'modules/stake-avax/actions/fetchTotalHistoryData';

export interface ITxHistoryData {
  isHistoryDataLoading: boolean;
  pendingUnstakeHistoryAAVAXB: IPendingTableRow[];
  pendingUnstakeHistoryAAVAXC: IPendingTableRow[];
  handleLoadTxHistory: () => void;
}

export const useStakedAVAXTxHistory = (): ITxHistoryData => {
  const [refetchTotalHistory, { data, isFetching: isHistoryDataLoading }] =
    useLazyGetAVAXTotalHistoryDataQuery();

  const pendingUnstakeAAVAXB = useMemo(
    () =>
      data?.pendingBond?.filter(
        ({ txType }) => txType === EAvalanchePoolEventsMap.AvaxClaimPending,
      ) ?? [],
    [data?.pendingBond],
  );

  const pendingUnstakeAAVAXC = useMemo(
    () =>
      data?.pendingCertificate?.filter(
        ({ txType }) => txType === EAvalanchePoolEventsMap.AvaxClaimPending,
      ) ?? [],
    [data?.pendingCertificate],
  );

  const pendingUnstakeHistoryAAVAXB = pendingUnstakeAAVAXB
    ? pendingUnstakeAAVAXB.map((transaction, index) => {
        const date = t('format.date', { value: transaction.txDate });
        const time = t('format.time-short', { value: transaction.txDate });

        return {
          id: index + 1,
          token: Token.aAVAXb,
          amount: transaction.txAmount,
          timerSlot: `${date}, ${time}`,
        };
      })
    : [];

  const pendingUnstakeHistoryAAVAXC = pendingUnstakeAAVAXC
    ? pendingUnstakeAAVAXC.map((transaction, index) => {
        const date = t('format.date', { value: transaction.txDate });
        const time = t('format.time-short', { value: transaction.txDate });

        return {
          id: index + 1,
          token: Token.aAVAXc,
          amount: transaction.txAmount,
          timerSlot: `${date}, ${time}`,
        };
      })
    : [];

  const handleLoadTxHistory = useCallback(() => {
    refetchTotalHistory();
  }, [refetchTotalHistory]);

  return {
    isHistoryDataLoading,
    pendingUnstakeHistoryAAVAXB,
    pendingUnstakeHistoryAAVAXC,
    handleLoadTxHistory,
  };
};
