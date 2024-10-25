import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from '@ankr.com/chains-list';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { EndpointGroup } from 'modules/endpoints/types';
import { getChainId } from 'modules/chains/utils/getChainId';
import { isReactSnap } from 'modules/common/utils/isReactSnap';

import { checkPublicChainsAndGetChainId } from '../../const';
import { UsageData } from '../../types';
import { usePublicStats } from './usePublicStats';

export interface UsageDataParams {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  timeframe: Timeframe;
}

export const usePublicUsageData = ({
  chain,
  chainSubType,
  chainType,
  group,
  timeframe,
}: UsageDataParams): UsageData => {
  const { isLoggedIn, loading: isConnecting } = useAuth();
  const chainId = getChainId({
    publicChain: chain,
    chainType,
    chainSubType,
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
    skipFetching: isReactSnap,
  });

  return {
    countries,
    error,
    isConnecting,
    loading: isLoading || isConnecting || isReactSnap,
    timeframe,
    totalCached,
    totalRequests,
    totalRequestsHistory,
    userTopRequests: undefined,
    userTopRequestsIp: undefined,
    isLoggedIn,
  };
};
