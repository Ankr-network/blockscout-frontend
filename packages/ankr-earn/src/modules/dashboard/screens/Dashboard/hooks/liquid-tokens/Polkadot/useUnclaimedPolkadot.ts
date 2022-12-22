import { useQuery } from '@redux-requests/react';

import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { DOT_PROPS, KSM_PROPS, WND_PROPS } from '../../../const';
import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseUnclaimedPolkadot {
  isUnclaimedDotBondShowed: boolean;
  isUnclaimedKsmBondShowed: boolean;
  isUnclaimedWndBondShowed: boolean;
  isUnclaimedDotBondLoading: boolean;
  isUnclaimedKsmBondLoading: boolean;
  isUnclaimedWndBondLoading: boolean;
}

export const useUnclaimedPolkadot = (
  isSmallBalancesVisible = true,
): IUseUnclaimedPolkadot => {
  const { data: unclaimedDotBond, loading: isUnclaimedDotBondLoading } =
    useQuery({
      type: fetchETHTokenClaimableBalance,
      requestKey: getPolkadotRequestKey(EPolkadotNetworks.DOT),
    });

  const { data: unclaimedKsmBond, loading: isUnclaimedKsmBondLoading } =
    useQuery({
      type: fetchETHTokenClaimableBalance,
      requestKey: getPolkadotRequestKey(EPolkadotNetworks.KSM),
    });

  const { data: unclaimedWndBond, loading: isUnclaimedWndBondLoading } =
    useQuery({
      type: fetchETHTokenClaimableBalance,
      requestKey: getPolkadotRequestKey(EPolkadotNetworks.WND),
    });

  const dotServiceName = EMetricsServiceName[DOT_PROPS.network];

  const usdUnclaimedDotBondAmount = useGetUSDAmount(
    unclaimedDotBond?.claimable,
    dotServiceName,
  );

  const ksmServiceName = EMetricsServiceName[KSM_PROPS.network];

  const usdUnclaimedKsmBondAmount = useGetUSDAmount(
    unclaimedKsmBond?.claimable,
    ksmServiceName,
  );

  const wndServiceName = EMetricsServiceName[WND_PROPS.network];

  const usdUnclaimedWndBondAmount = useGetUSDAmount(
    unclaimedWndBond?.claimable,
    wndServiceName,
  );

  const isUnclaimedDotBondShowed = getIsBalancePositive(
    unclaimedDotBond?.claimable,
  );

  const isUnclaimedKsmBondShowed = getIsBalancePositive(
    unclaimedKsmBond?.claimable,
  );

  const isUnclaimedWndBondShowed = getIsBalancePositive(
    unclaimedWndBond?.claimable,
  );

  return {
    isUnclaimedDotBondShowed: filterTokensBySmallBalance(
      [usdUnclaimedDotBondAmount],
      isUnclaimedDotBondShowed,
      isSmallBalancesVisible,
    ),
    isUnclaimedKsmBondShowed: filterTokensBySmallBalance(
      [usdUnclaimedKsmBondAmount],
      isUnclaimedKsmBondShowed,
      isSmallBalancesVisible,
    ),
    isUnclaimedWndBondShowed: filterTokensBySmallBalance(
      [usdUnclaimedWndBondAmount],
      isUnclaimedWndBondShowed,
      isSmallBalancesVisible,
    ),
    isUnclaimedDotBondLoading,
    isUnclaimedKsmBondLoading,
    isUnclaimedWndBondLoading,
  };
};
