import { useQuery } from '@redux-requests/react';
import { format } from 'date-fns';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { t } from 'modules/i18n/utils/intl';
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import {
  EPolygonPoolEventsMap,
  ITxEventsHistoryData,
} from 'modules/stake-polygon/api/PolygonSDK';
import { POLYGON_PROVIDER_ID } from 'modules/stake-polygon/const';

interface IUseMaticStakingAsset {
  txHistory: ITxEventsHistoryData | null;
  pendingUnstakeHistory: IPendingTableRow[];
  transactionHistory: HistoryDialogData;
  loading: boolean;
}

export const useMaticTxHistory = (): IUseMaticStakingAsset => {
  const { data, loading } = useQuery({
    type: fetchTxHistory,
  });

  const polygonAuth = useAuth(POLYGON_PROVIDER_ID);

  const network = polygonAuth.chainId;

  const staked = data?.completed
    ?.filter(el => el?.txType === EPolygonPoolEventsMap.StakePending)
    .map(el => {
      if (!el)
        return {
          date: undefined,
          hash: undefined,
          link: undefined,
          amount: undefined,
        };

      return {
        date: el.txDate,
        hash: el.txHash,
        link: network && getTxLinkByNetwork(el.txHash, network),
        amount: el.txAmount,
      };
    });

  const unstaked = data?.completed
    .filter(el => el?.txType === EPolygonPoolEventsMap.MaticClaimPending)
    .map(el => {
      if (!el)
        return {
          date: undefined,
          hash: undefined,
          link: undefined,
          amount: undefined,
        };

      return {
        date: el?.txDate,
        hash: el?.txHash,
        link: network && getTxLinkByNetwork(el.txHash, network),
        amount: el?.txAmount,
      };
    });

  const transactionHistory = { token: Token.MATIC, staked, unstaked };

  const pendingUnstake = data?.pending.filter(
    transaction =>
      transaction?.txType === EPolygonPoolEventsMap.MaticClaimPending,
  );

  const pendingUnstakeHistory: IPendingTableRow[] = pendingUnstake
    ? pendingUnstake.map((transaction, index): IPendingTableRow => {
        if (!transaction)
          return {
            id: index + 1,
            amount: '',
            timerSlot: t('dashboard.unstake-time', {
              month: '',
              day: '',
              year: '',
            }),
          };

        return {
          id: index + 1,
          amount: t('unit.token-value', {
            value: transaction.txAmount.toFormat(),
            token: Token.aMATICb,
          }),
          timerSlot: format(transaction.txDate, t('dashboard.unstake-time')),
        };
      })
    : [];

  return {
    txHistory: data,
    pendingUnstakeHistory,
    transactionHistory,
    loading,
  };
};
