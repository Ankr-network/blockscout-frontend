import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { configFromEnv } from 'modules/api/config';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { stake } from 'modules/stake-bnb/actions/stake';
import { unstake } from 'modules/stake-bnb/actions/unstake';
import { BINANCE_PROVIDER_ID } from 'modules/stake-bnb/const';
import { RoutesConfig as StakeBinanceRoutes } from 'modules/stake-bnb/Routes';

interface IUseABNBBCardData {
  token: Token;
  tokenAddress: string;
  network: string;
  amount: BigNumber;
  pendingValue: BigNumber;
  tradeLink: string;
  stakeLink: string;
  unstakeLink: string;
  isBalancesLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
  isShowed: boolean;
}

export const useABNBBCard = (hasHistory: boolean): IUseABNBBCardData => {
  const { chainId } = useConnectedData(BINANCE_PROVIDER_ID);
  const { data, loading: isBalancesLoading } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const amount = data?.aBNBbBalance ?? new BigNumber(0);
  const pendingValue = data?.pendingClaim ?? new BigNumber(0);

  const isShowed =
    !amount.isZero() ||
    !pendingValue.isZero() ||
    isBalancesLoading ||
    hasHistory;

  return {
    isUnstakeLoading,
    isStakeLoading,
    isBalancesLoading,
    token: Token.aBNBb,
    tokenAddress: configFromEnv().binanceConfig.aBNBbToken,
    network: t(`chain.${chainId}`),
    amount,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(Token.aBNBb, Token.BNB),
    unstakeLink: StakeBinanceRoutes.unstake.generatePath(),
    stakeLink: StakeBinanceRoutes.stake.generatePath(),
    pendingValue,
    isShowed,
  };
};
