import { useQuery, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from 'provider/providerManager/types';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { t } from 'modules/i18n/utils/intl';
import { fetchStats as fetchStakeBNBStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake as stakeBNB } from 'modules/stake-bnb/actions/stake';
import { unstake as unstakeBNB } from 'modules/stake-bnb/actions/unstake';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { RoutesConfig as StakeBinanceRoutes } from 'modules/stake-bnb/Routes';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';

export interface IStakedBNBData {
  amount: BigNumber;
  pendingValue: BigNumber;
  network: string;
  tradeLink: string;
  unstakeLink: string;
  stakeLink: string;
  stakeType: string;
  unstakeType: string;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
}

export const useStakedBNBData = (): IStakedBNBData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchStakeBNBStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakeBNB });
  const { loading: isUnstakeLoading } = useMutation({ type: unstakeBNB });

  const { chainId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const network = t(`chain.${chainId}`);

  const amount = statsData?.aBNBbBalance ?? ZERO;
  const pendingValue = statsData?.pendingClaim ?? ZERO;

  return {
    amount,
    network,
    pendingValue,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aBNBb, Token.BNB),
    stakeLink: StakeBinanceRoutes.stake.generatePath(),
    unstakeLink: StakeBinanceRoutes.unstake.generatePath(),
    stakeType: EBinancePoolEventsMap.StakePending,
    unstakeType: EBinancePoolEventsMap.ClaimPending,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
  };
};
