import { ACTION_CACHE_SEC } from 'modules/common/const';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { IUseTradeInfo, useTradeInfo } from 'modules/stake/hooks/useTradeInfo';

export const useEthTradeInfo = (): IUseTradeInfo => {
  const { data: commonData } = useGetETHCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  return useTradeInfo({
    baseToken: 'ETH',
    network: 'ETH',
    targetToken: 'ankrETH',
    ratio: commonData?.aETHcRatio,
  });
};
