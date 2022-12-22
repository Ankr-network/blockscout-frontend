import { useQuery } from '@redux-requests/react';

import { ZERO } from 'modules/common/const';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { fetchPolkadotPendingHistoryAmountSum } from 'modules/stake-polkadot/actions/fetchPolkadotPendingHistoryAmountSum';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { DOT_PROPS, KSM_PROPS, WND_PROPS } from '../../../const';
import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseStakedPolkadotTokens {
  isStakedDotBondShowed: boolean;
  isStakedWndBondShowed: boolean;
  isStakedKsmBondShowed: boolean;
  isDotBondBalanceLoading: boolean;
  isKsmBondBalanceLoading: boolean;
  isWndBondBalanceLoading: boolean;
}

export const useStakedPolkadotTokens = (
  isSmallBalancesVisible = true,
): IUseStakedPolkadotTokens => {
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

  const dotServiceName = EMetricsServiceName[DOT_PROPS.network];

  const usdDotAmount = useGetUSDAmount(dotBondBalance ?? ZERO, dotServiceName);

  const usdDotPendingAmount = useGetUSDAmount(
    pendingDOT ?? ZERO,
    dotServiceName,
  );

  const wndServiceName = EMetricsServiceName[WND_PROPS.network];

  const usdWndAmount = useGetUSDAmount(wndBondBalance ?? ZERO, wndServiceName);

  const usdWndPendingAmount = useGetUSDAmount(
    pendingWND ?? ZERO,
    wndServiceName,
  );

  const ksmServiceName = EMetricsServiceName[KSM_PROPS.network];

  const usdKsmAmount = useGetUSDAmount(ksmBondBalance ?? ZERO, ksmServiceName);

  const usdKsmPendingAmount = useGetUSDAmount(
    pendingKSM ?? ZERO,
    ksmServiceName,
  );

  const isStakedDotBondShowed =
    getIsBalancePositive(dotBondBalance) || getIsBalancePositive(pendingDOT);

  const isStakedWndBondShowed =
    getIsBalancePositive(wndBondBalance) || getIsBalancePositive(pendingWND);

  const isStakedKsmBondShowed =
    getIsBalancePositive(ksmBondBalance) || getIsBalancePositive(pendingKSM);

  return {
    isStakedDotBondShowed: filterTokensBySmallBalance(
      [usdDotAmount, usdDotPendingAmount],
      isStakedDotBondShowed,
      isSmallBalancesVisible,
    ),
    isStakedWndBondShowed: filterTokensBySmallBalance(
      [usdWndAmount, usdWndPendingAmount],
      isStakedWndBondShowed,
      isSmallBalancesVisible,
    ),
    isStakedKsmBondShowed: filterTokensBySmallBalance(
      [usdKsmAmount, usdKsmPendingAmount],
      isStakedKsmBondShowed,
      isSmallBalancesVisible,
    ),
    isDotBondBalanceLoading: isDotBondBalanceLoading || isPendingDOTLoading,
    isKsmBondBalanceLoading: isKsmBondBalanceLoading || isPendingKSMLoading,
    isWndBondBalanceLoading: isWndBondBalanceLoading || isPendingWNDLoading,
  };
};
