import { useQuery } from '@redux-requests/react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { ZERO } from 'modules/common/const';
import { useSmallBalances } from 'modules/dashboard/components/hooks/useSmallBalances';
import { filterTokensBySmallBalance } from 'modules/dashboard/utils/filterTokensBySmallBalance';
import { getIsBalancePositive } from 'modules/dashboard/utils/getIsBalancePositive';
import { useGetAnkrPriceQuery } from 'modules/stake-ankr/actions/getANKRPrice';
import { useGetIsMigratedQuery } from 'modules/stake-ankr/actions/getIsMigrated';
import { useGetTotalInfoQuery } from 'modules/stake-ankr/actions/getTotalInfo';
import { getMGNOPrice } from 'modules/stake-mgno/actions/getMGNOPrice';
import { getTotalInfo as getTotalMGnoInfo } from 'modules/stake-mgno/actions/getTotalInfo';

interface IUseDelegatedTokens {
  isDelegateAssetsShowed: boolean;
  isANKRShowed: boolean;
  isMGNOShowed: boolean;
  isAnkrMigrationNotificationShowed: boolean;
  isDelegatedTokensLoading: boolean;
}

export const useDelegatedTokens = (): IUseDelegatedTokens => {
  const {
    data: totalAnkrInfo,
    isFetching: isTotalAnkrInfoLoading,
    refetch: getTotalInfoRefetch,
  } = useGetTotalInfoQuery();

  const { data: ankrPrice } = useGetAnkrPriceQuery();

  const { address } = useConnectedData(AvailableWriteProviders.ethCompatible);
  const { data: isMigratedData, isFetching: isMigratedDataLoading } =
    useGetIsMigratedQuery(address);

  const { data: totalMGnoInfo, loading: isTotalMGnoInfoLoading } = useQuery({
    type: getTotalMGnoInfo,
  });

  const { data: usdRatio, loading: ratioLoading } = useQuery({
    type: getMGNOPrice,
  });

  const { isSmallBalancesVisible } = useSmallBalances();

  const ankrUsdPrice = totalAnkrInfo?.totalDelegatedAmount.multipliedBy(
    ankrPrice ?? ZERO,
  );
  const mgnoUsdAmount = totalMGnoInfo?.myTotalDelegatedAmount.multipliedBy(
    usdRatio ?? ZERO,
  );
  const mgnoUsdRewards = totalMGnoInfo?.myAllValidationRewards.multipliedBy(
    usdRatio ?? ZERO,
  );

  useProviderEffect(() => {
    getTotalInfoRefetch();
  }, []);

  const isANKRShowed =
    getIsBalancePositive(totalAnkrInfo?.totalDelegatedAmount) ||
    !!totalAnkrInfo?.claimableRewards.length;

  const isMGNOShowed =
    getIsBalancePositive(totalMGnoInfo?.myTotalDelegatedAmount) ||
    getIsBalancePositive(totalMGnoInfo?.myAllValidationRewards);

  const isANKRSmallBalanceShowed = filterTokensBySmallBalance(
    [ankrUsdPrice],
    isANKRShowed,
    isSmallBalancesVisible,
  );

  const isMGNOSmallBalanceShowed = filterTokensBySmallBalance(
    [mgnoUsdAmount, mgnoUsdRewards],
    isMGNOShowed,
    isSmallBalancesVisible,
  );

  const isAnkrMigrationNotificationShowed = !!(
    isMigratedData?.isMigrationNeeded && !isMigratedData?.isMigrated
  );

  const isDelegateAssetsShowed =
    isANKRSmallBalanceShowed ||
    isMGNOSmallBalanceShowed ||
    isAnkrMigrationNotificationShowed;

  const isDelegatedTokensLoading =
    isTotalAnkrInfoLoading ||
    isTotalMGnoInfoLoading ||
    ratioLoading ||
    isMigratedDataLoading;

  return {
    isDelegateAssetsShowed,
    isDelegatedTokensLoading,
    isANKRShowed:
      isANKRSmallBalanceShowed && !isAnkrMigrationNotificationShowed,
    isAnkrMigrationNotificationShowed,
    isMGNOShowed: isMGNOSmallBalanceShowed,
  };
};
