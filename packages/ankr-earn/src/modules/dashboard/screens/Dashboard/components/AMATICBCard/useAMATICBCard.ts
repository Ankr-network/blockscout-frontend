import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { configFromEnv } from 'modules/api/config';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake } from 'modules/stake-polygon/actions/stake';
import { unstake } from 'modules/stake-polygon/actions/unstake';
import { POLYGON_PROVIDER_ID } from 'modules/stake-polygon/const';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';

interface IUseMaticStakingAsset {
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

export const useAMATICBCard = (hasHistory: boolean): IUseMaticStakingAsset => {
  const { chainId } = useConnectedData(POLYGON_PROVIDER_ID);
  const { data, loading: isBalancesLoading } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  const amount = data?.aMaticbBalance ?? new BigNumber(0);
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
    token: Token.aMATICb,
    tokenAddress: configFromEnv().contractConfig.aMaticbToken,
    network: t(`chain.${chainId}`),
    amount,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(
      Token.aMATICb,
      Token.MATIC,
    ),
    unstakeLink: StakePolygonRoutes.unstake.generatePath(),
    stakeLink: StakePolygonRoutes.stake.generatePath(),
    pendingValue,
    isShowed,
  };
};
