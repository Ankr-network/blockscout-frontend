import { useIsMDUp } from 'ui';

import { PortfolioChart } from 'modules/dashboard/components/PortfolioChart';

import { usePortfolioNativeData } from '../../hooks/usePortfolioNativeData';
import { usePortfolioStakedData } from '../../hooks/usePortfolioStakedData';

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

  const {
    isLoading: isStakedDataLoading,
    totalAmountUsd: totalStakedAmountUsd,
    totalYieldAmountUsd: totalStakedYieldAmountUsd,
    apr: stakedApr,
    data: stakedData,
  } = usePortfolioStakedData();

  return (
    <PortfolioChart
      data={nativeData.concat(stakedData)}
      height={isMDUp ? CHART_SIZE : CHART_SIZE_MOBILE}
      isLoading={isNativeDataLoading || isStakedDataLoading}
      nativeApr={nativeApr}
      stakedApr={stakedApr}
      totalNativeAmountUsd={totalNativeAmountUsd}
      totalNativeYieldAmountUsd={totalNativeYieldAmountUsd}
      totalStakedAmountUsd={totalStakedAmountUsd}
      totalStakedYieldAmountUsd={totalStakedYieldAmountUsd}
      width={isMDUp ? CHART_SIZE : CHART_SIZE_MOBILE}
    />
  );
};
