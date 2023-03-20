import { ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetAVAXCommonDataQuery } from 'modules/stake-avax/actions/useGetAVAXCommonDataQuery';
import { IUseTradeInfo, useTradeInfo } from 'modules/stake/hooks/useTradeInfo';

export const useAvaxTradeInfo = (): IUseTradeInfo => {
  const { data: getStatsData } = useGetAVAXCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  return useTradeInfo({
    baseToken: Token.AVAX,
    network: 'avax',
    targetToken: Token.aAVAXc,
    ratio: getStatsData?.aAVAXcRatio,
  });
};
