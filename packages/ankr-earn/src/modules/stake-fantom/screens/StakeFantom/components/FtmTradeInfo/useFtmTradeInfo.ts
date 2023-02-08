import { ACTION_CACHE_SEC } from 'modules/common/const';
import { useGetFTMCommonDataQuery } from 'modules/stake-fantom/actions/getCommonData';
import { IUseTradeInfo, useTradeInfo } from 'modules/stake/hooks/useTradeInfo';

export const useFtmTradeInfo = (): IUseTradeInfo => {
  const { data: ftmCommonData } = useGetFTMCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  return useTradeInfo({
    baseToken: 'FTM',
    network: 'FANTOM',
    targetToken: 'aFTMc',
    ratio: ftmCommonData?.aFTMcRatio,
  });
};
