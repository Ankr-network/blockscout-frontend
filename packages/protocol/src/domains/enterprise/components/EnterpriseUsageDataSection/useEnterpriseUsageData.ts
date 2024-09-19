import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainProtocolContext } from 'domains/chains/screens/ChainPage/hooks/useChainProtocolContext';
import { getStatsChainId } from 'domains/chains/screens/ChainPage/components/ChainItemSections/utils/getStatsChainId';
import {
  getUserTopRequest,
  UsageDataParams,
} from 'domains/chains/screens/ChainPage/components/UsageDataSection/components/PrivateUsageDataSection/usePrivateUsageData';
import { UsageData } from 'domains/chains/screens/ChainPage/components/UsageDataSection/types';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainPage/components/UsageDataSection/const';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { getPrivateUsageData } from 'domains/chains/screens/ChainPage/components/UsageDataSection/components/PrivateUsageDataSection/PrivateUsageDataSectionUtils';
import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseStatsBySelectedApiKey } from 'domains/enterprise/store/selectors';
import { useEnterpriseStatsRequest } from 'domains/enterprise/hooks/useEnterpriseStatsRequest';

export const useEnterpriseUsageData = ({
  chain,
  chainSubType,
  chainType,
  group,
  timeframe,
}: UsageDataParams): UsageData => {
  const { loading: isConnecting } = useAuth();

  const { chainProtocol, isChainProtocolSwitchEnabled } =
    useChainProtocolContext();

  const chainId = getStatsChainId({
    publicChain: chain,
    chainType,
    chainSubType,
    group,
    isChainProtocolSwitchEnabled,
    chainProtocol,
  });

  const enterpriseCheckedChainId = checkPrivateChainsAndGetChainId(chainId);

  const {
    data,
    error: enterpriseStatsError,
    isLoading: areEnterpriseStatsLoading,
  } = useAppSelector(selectEnterpriseStatsBySelectedApiKey);

  const enterpriseStats = useMemo(() => {
    return data?.stats || {};
  }, [data]);

  useEnterpriseStatsRequest({
    interval: timeframeToIntervalMap[timeframe],
    shouldFetch: true,
  });

  const userTopRequests = getUserTopRequest(
    enterpriseStats,
    enterpriseCheckedChainId,
  );

  const enterpriseUsageData = useMemo(
    () =>
      getPrivateUsageData({
        isConnecting,
        arePrivateStatsLoading: areEnterpriseStatsLoading,
        privateStatsError: enterpriseStatsError,
        privateStats: enterpriseStats[enterpriseCheckedChainId],
        timeframe,
        userTopRequests,
      }),
    [
      isConnecting,
      areEnterpriseStatsLoading,
      enterpriseStatsError,
      enterpriseStats,
      enterpriseCheckedChainId,
      timeframe,
      userTopRequests,
    ],
  );

  return enterpriseUsageData;
};
