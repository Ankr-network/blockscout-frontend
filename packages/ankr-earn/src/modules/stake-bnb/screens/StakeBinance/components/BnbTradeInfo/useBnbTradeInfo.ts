import { ACTION_CACHE_SEC } from 'modules/common/const';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { IUseTradeInfo, useTradeInfo } from 'modules/stake/hooks/useTradeInfo';

export const useBnbTradeInfo = (): IUseTradeInfo => {
  const { data: statsData } = useGetBNBStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  return useTradeInfo({
    baseToken: 'BNB',
    network: 'BSC',
    targetToken: 'aBNBc',
    ratio: statsData?.aBNBcRatio,
  });
};
