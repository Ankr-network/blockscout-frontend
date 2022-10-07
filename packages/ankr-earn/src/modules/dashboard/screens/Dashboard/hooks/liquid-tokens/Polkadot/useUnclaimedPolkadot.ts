import { useQuery } from '@redux-requests/react';

import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';

interface IUseUnclaimedPolkadot {
  isUnclaimedDotBondShowed: boolean;
  isUnclaimedKsmBondShowed: boolean;
  isUnclaimedWndBondShowed: boolean;
  isUnclaimedDotBondLoading: boolean;
  isUnclaimedKsmBondLoading: boolean;
  isUnclaimedWndBondLoading: boolean;
}

export const useUnclaimedPolkadot = (): IUseUnclaimedPolkadot => {
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
    isUnclaimedDotBondShowed,
    isUnclaimedKsmBondShowed,
    isUnclaimedWndBondShowed,
    isUnclaimedDotBondLoading,
    isUnclaimedKsmBondLoading,
    isUnclaimedWndBondLoading,
  };
};
