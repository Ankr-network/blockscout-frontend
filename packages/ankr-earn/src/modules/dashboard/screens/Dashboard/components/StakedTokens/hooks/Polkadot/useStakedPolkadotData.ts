import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { t } from 'common';
import { AvailableWriteProviders } from 'provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import {
  ETH_NETWORK_BY_ENV,
  STAKE_LEGACY_LINKS,
  ZERO,
} from 'modules/common/const';
import { addETHTokenToWallet } from 'modules/stake-polkadot/actions/addETHTokenToWallet';
import { fetchETHTokenBalance } from 'modules/stake-polkadot/actions/fetchETHTokenBalance';
import { unstake } from 'modules/stake-polkadot/actions/unstake';
import { EPoolEventsMap } from 'modules/stake-polkadot/api/PolkadotStakeSDK';
import { RoutesConfig } from 'modules/stake-polkadot/Routes';
import {
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';

export interface IUseStakedPolkadotDataProps {
  ethToken: TPolkadotETHToken;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
}

interface IStakedPolkadotData {
  address?: string;
  amount: BigNumber;
  handleAddTokenToWallet: () => void;
  isBalancesLoading: boolean;
  isShowed: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  network: string;
  pendingValue: BigNumber;
  stakeLink: string;
  stakeType: string;
  tradeLink: string;
  unstakeLink: string;
  unstakeType: string;
  walletName?: string;
}

/**
 *  TODO Add logic for this beta version (Polkadot staking)
 */
export const useStakedPolkadotData = ({
  ethToken,
  network,
  polkadotToken,
}: IUseStakedPolkadotDataProps): IStakedPolkadotData => {
  const dispatchRequest = useDispatchRequest();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );
  const { loading: isUnstakeLoading } = useMutation({ type: unstake });
  const { data: balance, loading: isBalancesLoading } = useQuery({
    type: fetchETHTokenBalance,
    requestKey: getPolkadotRequestKey(network),
  });

  const chainTitle = t(`chain.${ETH_NETWORK_BY_ENV}`);
  const amount = balance ?? ZERO;
  const isShowed = !amount.isZero() || isBalancesLoading;

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(addETHTokenToWallet(network));
  }, [dispatchRequest, network]);

  return {
    address,
    amount,
    handleAddTokenToWallet,
    isBalancesLoading,
    isShowed,
    isStakeLoading: false,
    isUnstakeLoading,
    network: chainTitle,
    pendingValue: ZERO,
    stakeLink: STAKE_LEGACY_LINKS[network] ?? '',
    stakeType: EPoolEventsMap.Staked,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(ethToken, polkadotToken),
    unstakeLink: RoutesConfig.unstake.generatePath(network),
    unstakeType: EPoolEventsMap.Unstaked,
    walletName,
  };
};
