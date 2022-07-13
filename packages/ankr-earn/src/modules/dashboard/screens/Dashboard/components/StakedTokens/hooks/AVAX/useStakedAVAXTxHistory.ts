import { useQuery } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';
import { t } from 'common';

import { useAuth } from 'modules/auth/common/hooks/useAuth';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { fetchTxHistory } from 'modules/stake-avax/actions/fetchTxHistory';
import { EAvalanchePoolEventsMap } from 'modules/stake-avax/api/AvalancheSDK';
import { useAppDispatch } from 'store/useAppDispatch';

import { ITxEventsHistoryGroupItem } from '../../../../types';

interface IGetHistoryTransactionsArgs {
  type: EAvalanchePoolEventsMap;
  network?: number;
  data?: ITxEventsHistoryGroupItem[];
}

const getCompletedTransactions = ({
  data,
  network,
  type,
}: IGetHistoryTransactionsArgs):
  | HistoryDialogData['staked']
  | HistoryDialogData['unstaked'] => {
  if (!data) return [];

  return data
    .filter(({ txType }) => txType === type)
    .map(({ txDate, txHash, txAmount }) => ({
      date: txDate,
      hash: txHash,
      link: network ? getTxLinkByNetwork(txHash, network) : '',
      amount: txAmount,
    }));
};

export interface ITxHistoryData {
  transactionHistoryAAVAXB: HistoryDialogData;
  transactionHistoryAAVAXC: HistoryDialogData;
  pendingUnstakeHistoryAAVAXB: IPendingTableRow[];
  pendingUnstakeHistoryAAVAXC: IPendingTableRow[];
  hasHistory: boolean;
  isHistoryDataLoading: boolean;
  handleLoadTxHistory: () => void;
}

export const useStakedAVAXTxHistory = (): ITxHistoryData => {
  const { data, loading: isHistoryDataLoading } = useQuery({
    type: fetchTxHistory,
  });
  const { chainId } = useAuth(AvailableWriteProviders.ethCompatible);
  const dispatch = useAppDispatch();

  const network = isEVMCompatible(chainId) ? chainId : undefined;

  const stakedAAVAXB = useMemo(() => {
    return getCompletedTransactions({
      data: data?.completedAAVAXB,
      type: EAvalanchePoolEventsMap.StakePending,
      network,
    });
  }, [data?.completedAAVAXB, network]);

  const stakedAAVAXC = useMemo(() => {
    return getCompletedTransactions({
      data: data?.completedAAVAXC,
      type: EAvalanchePoolEventsMap.StakePending,
      network,
    });
  }, [data?.completedAAVAXC, network]);

  const unstakedAAVAXB = useMemo(() => {
    return getCompletedTransactions({
      data: data?.completedAAVAXB,
      type: EAvalanchePoolEventsMap.AvaxClaimPending,
      network,
    });
  }, [data?.completedAAVAXB, network]);

  const unstakedAAVAXC = useMemo(() => {
    return getCompletedTransactions({
      data: data?.completedAAVAXC,
      type: EAvalanchePoolEventsMap.AvaxClaimPending,
      network,
    });
  }, [data?.completedAAVAXC, network]);

  const pendingUnstakeAAVAXB = useMemo(
    () =>
      data?.pendingAAVAXB?.filter(
        ({ txType }) => txType === EAvalanchePoolEventsMap.AvaxClaimPending,
      ) ?? [],
    [data?.pendingAAVAXB],
  );

  const pendingUnstakeAAVAXC = useMemo(
    () =>
      data?.pendingAAVAXC?.filter(
        ({ txType }) => txType === EAvalanchePoolEventsMap.AvaxClaimPending,
      ) ?? [],
    [data?.pendingAAVAXC],
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

  const handleLoadTxHistory = useCallback(() => {
    dispatch(fetchTxHistory());
  }, [dispatch]);

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
