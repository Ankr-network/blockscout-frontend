import { ACTION_CACHE_SEC } from 'modules/common/const';
import { useGetMaticOnPolygonCommonDataQuery } from 'modules/stake-matic/polygon/actions/getMaticOnPolygonCommonData';
import { IUseTradeInfo, useTradeInfo } from 'modules/stake/hooks/useTradeInfo';

export const usePolygonMaticTradeInfo = (): IUseTradeInfo => {
  const { data: commonData } = useGetMaticOnPolygonCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  return useTradeInfo({
    baseToken: 'MATIC',
    network: 'POLYGON',
    targetToken: 'ankrMATIC',
    ratio: commonData?.ratio,
  });
};
