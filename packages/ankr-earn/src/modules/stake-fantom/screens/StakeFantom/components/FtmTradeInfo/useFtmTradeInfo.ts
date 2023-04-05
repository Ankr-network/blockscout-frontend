import { ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { IUseTradeInfo, useTradeInfo } from 'modules/stake/hooks/useTradeInfo';

export const useFtmTradeInfo = (): IUseTradeInfo => {
  const { data: ftmCommonData } = useGetFTMCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  return useTradeInfo({
    baseToken: Token.FTM,
    network: 'fantom',
    targetToken: Token.aFTMc,
    ratio: ftmCommonData?.aFTMcRatio,
  });
};