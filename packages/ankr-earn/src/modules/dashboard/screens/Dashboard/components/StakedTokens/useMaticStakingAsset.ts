import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
import { DEFAULT_ROUNDING } from 'modules/common/const';
import { EToken } from 'modules/dashboard/types';
import { t } from 'modules/i18n/utils/intl';
import { fetchStats } from 'modules/stake-polygon/actions/fetchStats';
import { stake } from 'modules/stake-polygon/actions/stake';
import { unstake } from 'modules/stake-polygon/actions/unstake';
import { POLYGON_PROVIDER_ID } from 'modules/stake-polygon/const';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';

interface IUseMaticStakingAsset {
  token: EToken;
  network: string;
  amount: BigNumber;
  pendingValue?: string;
  tradeLink: string;
  stakeLink: string;
  unstakeLink: string;
  isLoading: boolean;
  isStakeLoading: boolean;
  isUnstakeLoading: boolean;
}

export const useMaticStakingAsset = (): IUseMaticStakingAsset => {
  const { chainId } = useConnectedData(POLYGON_PROVIDER_ID);
  const { data, loading } = useQuery({
    type: fetchStats,
  });

  const { loading: isStakeLoading } = useMutation({ type: stake });
  const { loading: isUnstakeLoading } = useMutation({ type: unstake });

  return {
    isUnstakeLoading,
    isStakeLoading,
    isLoading: loading,
    token: EToken.aMATICb,
    network: t(`chain.${chainId}`),
    amount: data?.aMaticbBalance ?? new BigNumber(0),
    tradeLink: BoostRoutes.tradingCockpit.generatePath(EToken.aMATICb, 'MATIC'),
    unstakeLink: StakePolygonRoutes.unstake.generatePath(),
    stakeLink: StakePolygonRoutes.stake.generatePath(),
    pendingValue:
      data?.pendingClaim.decimalPlaces(DEFAULT_ROUNDING).toFormat() ??
      undefined,
  };
};
