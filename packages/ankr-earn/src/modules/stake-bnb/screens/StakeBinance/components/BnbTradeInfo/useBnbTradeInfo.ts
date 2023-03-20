import { ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetBNBStatsQuery } from 'modules/stake-bnb/actions/useGetBNBStatsQuery';
import { IUseTradeInfo, useTradeInfo } from 'modules/stake/hooks/useTradeInfo';

export const useBnbTradeInfo = (): IUseTradeInfo => {
  const { data: statsData } = useGetBNBStatsQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  return useTradeInfo({
    baseToken: Token.BNB,
    network: 'bsc',
    targetToken: Token.aBNBc,
    ratio: statsData?.aBNBcRatio,
  });
};
