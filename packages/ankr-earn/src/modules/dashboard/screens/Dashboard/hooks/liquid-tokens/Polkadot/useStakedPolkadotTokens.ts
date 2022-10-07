import { useQuery } from '@redux-requests/react';

import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchPolkadotPendingHistoryAmountSum } from 'modules/stake-polkadot/actions/fetchPolkadotPendingHistoryAmountSum';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';

interface IUseStakedPolkadotTokens {
  isStakedDotBondShowed: boolean;
  isStakedWndBondShowed: boolean;
  isStakedKsmBondShowed: boolean;
  isDotBondBalanceLoading: boolean;
  isKsmBondBalanceLoading: boolean;
  isWndBondBalanceLoading: boolean;
}

export const useStakedPolkadotTokens = (): IUseStakedPolkadotTokens => {
  const { data: dotBondBalance, loading: isDotBondBalanceLoading } = useQuery({
    type: fetchETHTokenBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.DOT),
  });

  const { data: ksmBondBalance, loading: isKsmBondBalanceLoading } = useQuery({
    type: fetchETHTokenBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.KSM),
  });

  const { data: wndBondBalance, loading: isWndBondBalanceLoading } = useQuery({
    type: fetchETHTokenBalance,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.WND),
  });

  const { data: pendingDOT, loading: isPendingDOTLoading } = useQuery({
    type: fetchPolkadotPendingHistoryAmountSum,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.DOT),
  });

  const { data: pendingKSM, loading: isPendingKSMLoading } = useQuery({
    type: fetchPolkadotPendingHistoryAmountSum,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.KSM),
  });

  const { data: pendingWND, loading: isPendingWNDLoading } = useQuery({
    type: fetchPolkadotPendingHistoryAmountSum,
    requestKey: getPolkadotRequestKey(EPolkadotNetworks.WND),
  });

  const isStakedDotBondShowed =
    getIsBalancePositive(dotBondBalance) || getIsBalancePositive(pendingDOT);

  const isStakedWndBondShowed =
    getIsBalancePositive(wndBondBalance) || getIsBalancePositive(pendingWND);

  const isStakedKsmBondShowed =
    getIsBalancePositive(ksmBondBalance) || getIsBalancePositive(pendingKSM);

  return {
    isStakedDotBondShowed,
    isStakedWndBondShowed,
    isStakedKsmBondShowed,
    isDotBondBalanceLoading: isDotBondBalanceLoading || isPendingDOTLoading,
    isKsmBondBalanceLoading: isKsmBondBalanceLoading || isPendingKSMLoading,
    isWndBondBalanceLoading: isWndBondBalanceLoading || isPendingWNDLoading,
  };
};
