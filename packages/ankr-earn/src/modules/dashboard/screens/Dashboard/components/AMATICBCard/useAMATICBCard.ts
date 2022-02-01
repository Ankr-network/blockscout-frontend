import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useConnectedData } from 'modules/auth/hooks/useConnectedData';
import { RoutesConfig as BoostRoutes } from 'modules/boost/Routes';
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
  pendingValue: BigNumber;
  tradeLink: string;
  stakeLink: string;
  unstakeLink: string;
  isLoading: boolean;
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
    isLoading: isBalancesLoading,
    token: EToken.aMATICb,
    network: t(`chain.${chainId}`),
    amount,
    tradeLink: BoostRoutes.tradingCockpit.generatePath(EToken.aMATICb, 'MATIC'),
    unstakeLink: StakePolygonRoutes.unstake.generatePath(),
    stakeLink: StakePolygonRoutes.stake.generatePath(),
    pendingValue,
    isShowed,
  };
};
