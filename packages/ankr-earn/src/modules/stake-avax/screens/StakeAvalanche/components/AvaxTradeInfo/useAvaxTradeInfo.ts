import { ACTION_CACHE_SEC } from 'modules/common/const';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { IUseTradeInfo, useTradeInfo } from 'modules/stake/hooks/useTradeInfo';

export const useAvaxTradeInfo = (): IUseTradeInfo => {
  const { data: getStatsData } = useGetAVAXCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  return useTradeInfo({
    baseToken: 'AVAX',
    network: 'AVAX',
    targetToken: 'ankrAVAX',
    ratio: getStatsData?.aAVAXcRatio,
  });
};
