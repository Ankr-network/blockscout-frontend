import { useQuery, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { AvailableWriteProviders } from 'provider/providerManager/types';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { t } from 'modules/i18n/utils/intl';
import { fetchStats as fetchStakePolygonStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake as stakePolygon } from 'modules/stake-polygon/actions/stake';
import { unstake as unstakePolygon } from 'modules/stake-polygon/actions/unstake';
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';

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
}

export const useStakedMaticData = (): IStakedMaticData => {
  const { data: statsData, loading: isBalancesLoading } = useQuery({
    type: fetchStakePolygonStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stakePolygon });
  const { loading: isUnstakeLoading } = useMutation({ type: unstakePolygon });

  const { chainId } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const network = t(`chain.${chainId}`);

  const amount = statsData?.aMaticbBalance ?? ZERO;
  const pendingValue = statsData?.pendingClaim ?? ZERO;

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
  };
};
