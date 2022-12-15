import { ACTION_CACHE_SEC } from 'modules/common/const';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { EMetricsServiceName } from 'modules/stake/api/metrics';

import { useGetUSDAmount } from '../../useGetUSDAmount';

interface IUseStakedETH {
  isStakedEthBondShowed: boolean;
  isStakedEthCertShowed: boolean;
  isEthCommonLoading: boolean;
  isUnclaimedEthBondShowed: boolean;
}

export const useStakedETH = (isSmallBalancesVisible = true): IUseStakedETH => {
  const { data: ethCommon, isFetching: isEthCommonLoading } =
    useGetETHCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: ethClaimable, isFetching: isEthClaimableLoading } =
    useGetETHClaimableDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const usdAETHbAmount = useGetUSDAmount(
    ethCommon?.aETHbBalance,
    EMetricsServiceName.ETH,
  );

  const usdAETHcAmount = useGetUSDAmount(
    ethCommon?.aETHcBalance,
    EMetricsServiceName.ETH,
  );

  const isStakedEthBondShowed = getIsBalancePositive(ethCommon?.aETHbBalance);

  const isStakedEthCertShowed = getIsBalancePositive(ethCommon?.aETHcBalance);

  const isUnclaimedEthBondShowed = getIsBalancePositive(
    ethClaimable?.claimableAETHB,
  );

  return {
    isStakedEthBondShowed: filterTokensBySmallBalance(
      [usdAETHbAmount],
      isStakedEthBondShowed,
      isSmallBalancesVisible,
    ),
    isStakedEthCertShowed: filterTokensBySmallBalance(
      [usdAETHcAmount],
      isStakedEthCertShowed,
      isSmallBalancesVisible,
    ),
    isEthCommonLoading: isEthCommonLoading || isEthClaimableLoading,
    isUnclaimedEthBondShowed,
  };
};
