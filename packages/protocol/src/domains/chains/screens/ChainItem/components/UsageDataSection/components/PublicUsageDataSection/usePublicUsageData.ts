import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType, Timeframe } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { checkPublicSecretChainsAndGetChainId } from '../../const';
import { UsageData } from '../../types';
import { getChainId } from '../../utils/getChainId';
import { usePublicStats } from './usePublicStats';

export interface UsageDataParams {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
}

export const usePublicUsageData = ({
  chain,
  chainType,
  group,
  timeframe,
}: UsageDataParams): UsageData => {
  const { loading: isConnecting, isLoggedIn } = useAuth();
  const chainId = getChainId({
    publicChain: chain,
    chainType,
    group,
    withExceptions: !isLoggedIn,
  });

  const publicCheckedChainId = checkPublicSecretChainsAndGetChainId(chainId);

  const {
    countries,
    error,
    loading,
    totalCached,
    totalRequests,
    totalRequestsHistory,
  } = usePublicStats({
    chainId: publicCheckedChainId,
    timeframe,
  });

  return {
    countries,
    error,
    isConnecting,
    loading: loading || isConnecting,
    timeframe,
    totalCached,
    totalRequests,
    totalRequestsHistory,
    userTopRequests: undefined,
    userTopRequestsIp: undefined,
    isLoggedIn,
  };
};
