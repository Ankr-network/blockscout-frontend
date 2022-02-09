import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { t } from 'modules/i18n/utils/intl';
import { fetchTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import {
  EBinancePoolEventsMap,
  ITxEventsHistoryData,
} from 'modules/stake-bnb/api/BinanceSDK';
import { BINANCE_PROVIDER_ID } from 'modules/stake-bnb/const';

interface IUseBNBTxHistoryData {
  txHistory: ITxEventsHistoryData | null;
  hasHistory: boolean;
  pendingUnstakeHistory: IPendingTableRow[];
  transactionHistory: HistoryDialogData;
  loading: boolean;
}

export const useBNBTxHistory = (): IUseBNBTxHistoryData => {
  const { data, loading } = useQuery({
    type: fetchTxHistory,
  });

  const auth = useAuth(BINANCE_PROVIDER_ID);

  const network = auth.chainId;

  const staked = data?.completed
    ?.filter(el => el?.txType === EBinancePoolEventsMap.StakePending)
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
    .filter(el => el?.txType === EBinancePoolEventsMap.ClaimPending)
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

  const transactionHistory = { token: Token.BNB, staked, unstaked };

  const pendingUnstake = data?.pending.filter(
    transaction => transaction?.txType === EBinancePoolEventsMap.ClaimPending,
  );

  const pendingUnstakeHistory: IPendingTableRow[] = pendingUnstake
    ? pendingUnstake.map((transaction, index): IPendingTableRow => {
        if (!transaction)
          return {
            id: index + 1,
            amount: new BigNumber(0),
            token: '',
            timerSlot: '',
          };

        const date = t('format.date', { value: transaction.txDate });
        const time = t('format.time-short', { value: transaction.txDate });

        return {
          id: index + 1,
          token: Token.aBNBb,
          amount: transaction.txAmount,
          timerSlot: `${date}, ${time}`,
        };
      })
    : [];

  const hasHistory = !!staked?.length || !!unstaked?.length;

  return {
    txHistory: data,
    hasHistory,
    pendingUnstakeHistory,
    transactionHistory,
    loading,
  };
};
