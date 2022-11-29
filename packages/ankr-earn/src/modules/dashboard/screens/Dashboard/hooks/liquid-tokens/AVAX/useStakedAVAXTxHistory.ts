import { t } from '@ankr.com/common';
import { useCallback, useMemo } from 'react';

import { EAvalanchePoolEventsMap } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { IHistoryDialogData } from 'modules/common/components/HistoryDialog';
import { ACTION_CACHE_SEC, AVAX_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { useGetAVAXTotalHistoryDataQuery } from 'modules/stake-avax/actions/fetchTotalHistoryData';

import { ITxEventsHistoryGroupItem } from '../../../types';

interface IGetHistoryTransactionsArgs {
  type: EAvalanchePoolEventsMap;
  data?: ITxEventsHistoryGroupItem[];
}

const getCompletedTransactions = ({
  data,
  type,
}: IGetHistoryTransactionsArgs):
  | IHistoryDialogData['staked']
  | IHistoryDialogData['unstaked'] => {
  if (!data) return [];

  return data
    .filter(({ txType }) => txType === type)
    .map(({ txDate, txHash, txAmount }) => ({
      date: txDate,
      hash: txHash,
      link: getTxLinkByNetwork(txHash, AVAX_NETWORK_BY_ENV),
      amount: txAmount,
    }));
};

export interface ITxHistoryData {
  transactionHistoryAAVAXB: IHistoryDialogData;
  transactionHistoryAAVAXC: IHistoryDialogData;
  pendingUnstakeHistoryAAVAXB: IPendingTableRow[];
  pendingUnstakeHistoryAAVAXC: IPendingTableRow[];
  hasHistory: boolean;
  isHistoryDataLoading: boolean;
  handleLoadTxHistory: () => void;
}

export const useStakedAVAXTxHistory = (): ITxHistoryData => {
  const {
    data,
    isFetching: isHistoryDataLoading,
    refetch,
  } = useGetAVAXTotalHistoryDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const stakedAAVAXB = useMemo(() => {
    return getCompletedTransactions({
      data: data?.completedBond,
      type: EAvalanchePoolEventsMap.StakePending,
    });
  }, [data?.completedBond]);

  const stakedAAVAXC = useMemo(() => {
    return getCompletedTransactions({
      data: data?.completedCertificate,
      type: EAvalanchePoolEventsMap.StakePending,
    });
  }, [data?.completedCertificate]);

  const unstakedAAVAXB = useMemo(() => {
    return getCompletedTransactions({
      data: data?.completedBond,
      type: EAvalanchePoolEventsMap.AvaxClaimPending,
    });
  }, [data?.completedBond]);

  const unstakedAAVAXC = useMemo(() => {
    return getCompletedTransactions({
      data: data?.completedCertificate,
      type: EAvalanchePoolEventsMap.AvaxClaimPending,
    });
  }, [data?.completedCertificate]);

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

  const hasHistory =
    !!stakedAAVAXB?.length ||
    !!stakedAAVAXC?.length ||
    !!unstakedAAVAXB?.length ||
    !!unstakedAAVAXC?.length;

  useProviderEffect(() => {
    refetch();
  }, []);

  const handleLoadTxHistory = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    isHistoryDataLoading,
    pendingUnstakeHistoryAAVAXB,
    pendingUnstakeHistoryAAVAXC,
    hasHistory,
    transactionHistoryAAVAXB: {
      staked: stakedAAVAXB,
      stakedToken: Token.aAVAXb,
      unstaked: unstakedAAVAXB,
      unstakedToken: Token.aAVAXb,
    },
    transactionHistoryAAVAXC: {
      staked: stakedAAVAXC,
      stakedToken: Token.aAVAXc,
      unstaked: unstakedAAVAXC,
      unstakedToken: Token.aAVAXc,
    },
    handleLoadTxHistory,
  };
};
