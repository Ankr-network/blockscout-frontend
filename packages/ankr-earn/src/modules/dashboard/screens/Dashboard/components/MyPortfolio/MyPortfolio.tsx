import { useMemo } from 'react';

import { useIsMDUp } from 'ui';

import { useSmallBalances } from 'modules/dashboard/components/hooks/useSmallBalances';
import { PortfolioChart } from 'modules/dashboard/components/PortfolioChart';

import { usePortfolioCommonData } from './usePortfolioCommonData';
import { usePortfolioNativeData } from './usePortfolioNativeData';
import { usePortfolioStakedData } from './usePortfolioStakedData';

const CHART_SIZE = 350;
const CHART_SIZE_MOBILE = 280;

export const MyPortfolio = (): JSX.Element => {
  const isMDUp = useIsMDUp();

  const {
    isLoading: isNativeDataLoading,
    totalAmountUsd: totalNativeAmountUsd,
    totalYieldAmountUsd: totalNativeYieldAmountUsd,
    apr: nativeApr,
    data: nativeData,
  } = usePortfolioNativeData();

  const { isCurrentAccountPartner } = usePortfolioCommonData();

  const {
    isLoading: isStakedDataLoading,
    totalAmountUsd: totalStakedAmountUsd,
    totalYieldAmountUsd: totalStakedYieldAmountUsd,
    apr: stakedApr,
    data: stakedData,
  } = usePortfolioStakedData();

  const data = useMemo(
    () => [...nativeData, ...stakedData],
    [nativeData, stakedData],
  );

  const { isSmallBalancesVisible, onBalanceVisibilityChange } =
    useSmallBalances();

  return (
    <PortfolioChart
      data={data}
      height={isMDUp ? CHART_SIZE : CHART_SIZE_MOBILE}
      isCurrentAccountPartner={isCurrentAccountPartner}
      isLoading={isNativeDataLoading || isStakedDataLoading}
      isSmallBalancesVisible={isSmallBalancesVisible}
      nativeApr={nativeApr}
      stakedApr={stakedApr}
      totalNativeAmountUsd={totalNativeAmountUsd}
      totalNativeYieldAmountUsd={totalNativeYieldAmountUsd}
      totalStakedAmountUsd={totalStakedAmountUsd}
      totalStakedYieldAmountUsd={totalStakedYieldAmountUsd}
      width={isMDUp ? CHART_SIZE : CHART_SIZE_MOBILE}
      onBalanceVisibilityChange={onBalanceVisibilityChange}
    />
  );
};
