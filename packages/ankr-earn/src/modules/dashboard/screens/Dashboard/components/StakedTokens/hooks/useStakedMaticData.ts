import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { t } from 'modules/i18n/utils/intl';
import { fetchStats as fetchStakePolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake as stakePolygon } from 'modules/stake-polygon/actions/stake';
import { unstake as unstakePolygon } from 'modules/stake-polygon/actions/unstake';
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';

export interface IStakedMaticData {
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
  isShowed: boolean;
}

export const useStakedMaticData = (): IStakedMaticData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchStakePolygonStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakePolygon });
  const { loading: isUnstakeLoading } = useMutation({ type: unstakePolygon });

  const network = t(`chain.${ETH_NETWORK_BY_ENV}`);

  const amount = statsData?.aMaticbBalance ?? ZERO;
  const pendingValue = statsData?.pendingClaim ?? ZERO;

  const isShowed =
    !amount.isZero() || !pendingValue.isZero() || isBalancesLoading;

  return {
    amount,
    network,
    pendingValue,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(
      Token.aMATICb,
      Token.MATIC,
    ),
    stakeLink: StakePolygonRoutes.stake.generatePath(),
    unstakeLink: StakePolygonRoutes.unstake.generatePath(),
    stakeType: EPolygonPoolEventsMap.StakePending,
    unstakeType: EPolygonPoolEventsMap.MaticClaimPending,
    isBalancesLoading,
    isStakeLoading,
    isUnstakeLoading,
    isShowed,
  };
};
