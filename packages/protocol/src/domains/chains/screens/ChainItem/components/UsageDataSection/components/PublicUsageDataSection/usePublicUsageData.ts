import { useAuth } from 'domains/auth/hooks/useAuth';
import { Chain, ChainType, Timeframe } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { checkPublicChainsAndGetChainId } from '../../const';
import { UsageData } from '../../types';
import { getChainId } from '../../../ChainItemSections/utils/getChainId';
import { usePublicStats } from './usePublicStats';

export interface UsageDataParams {
  chain: Chain;
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
    keepEVMChainID: true,
    withExceptions: true,
  });

  const publicCheckedChainId = checkPublicChainsAndGetChainId(chainId);

  const {
    countries,
    error,
    isLoading,
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
    loading: isLoading || isConnecting,
    timeframe,
    totalCached,
    totalRequests,
    totalRequestsHistory,
    userTopRequests: undefined,
    userTopRequestsIp: undefined,
    isLoggedIn,
  };
};
