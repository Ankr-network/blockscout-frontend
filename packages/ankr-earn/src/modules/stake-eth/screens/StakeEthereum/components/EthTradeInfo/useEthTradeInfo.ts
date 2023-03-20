import { ACTION_CACHE_SEC } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import { IUseTradeInfo, useTradeInfo } from 'modules/stake/hooks/useTradeInfo';

export const useEthTradeInfo = (): IUseTradeInfo => {
  const { data: commonData } = useGetETHCommonDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  return useTradeInfo({
    baseToken: Token.ETH,
    network: 'eth',
    targetToken: Token.aETHc,
    ratio: commonData?.aETHcRatio,
  });
};
