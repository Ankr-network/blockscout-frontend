import { useQuery } from '@redux-requests/react';
import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import {
  EPolygonPoolEventsMap,
  ITxEventsHistoryData,
} from 'modules/stake-polygon/api/PolygonSDK';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  addHours,
} from 'date-fns';
import { UNSTAKE_TIME_WAIT_HOURS } from 'modules/stake-polygon/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import {
  MATIC_STAKING_NETWORKS,
  POLYGON_PROVIDER_ID,
} from 'modules/stake-polygon/const';
import { useAuth } from 'modules/auth/hooks/useAuth';

interface IUseMaticStakingAsset {
  txHistory: ITxEventsHistoryData | null;
  pendingUnstakeHistory: IPendingTableRow[];
  transactionHistory: HistoryDialogData;
}

export const useMaticTxHistory = (): IUseMaticStakingAsset => {
  const { data } = useQuery({
    type: fetchTxHistory,
  });

  const polygonAuth = useAuth(POLYGON_PROVIDER_ID, MATIC_STAKING_NETWORKS);

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
        let daysRemaining = 0;
        let hoursRemaining = 0;
        let minutesRemainig = 0;

        if (transaction) {
          const unstakeDate = addHours(
            new Date(transaction.txDate),
            UNSTAKE_TIME_WAIT_HOURS,
          );

          daysRemaining = differenceInDays(unstakeDate, Date.now());
          hoursRemaining = differenceInHours(unstakeDate, Date.now()) % 24;
          minutesRemainig = differenceInMinutes(unstakeDate, Date.now()) % 60;
        }

        return {
          id: index + 1,
          amount: transaction ? transaction.txAmount.toFormat() : '0',
          timerSlot: t('dashboard.unstake-time', {
            days: daysRemaining,
            hours: hoursRemaining,
            minutes: minutesRemainig,
          }),
        };
      })
    : [];

  return {
    txHistory: data,
    pendingUnstakeHistory,
    transactionHistory,
  };
};
