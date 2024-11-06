import { useMemo } from 'react';

import {
  UsageDataParams,
  getUserTopRequest,
} from 'domains/chains/screens/ChainPage/components/UsageDataSection/components/PrivateUsageDataSection/usePrivateUsageData';
import { checkPrivateChainsAndGetChainId } from 'domains/chains/screens/ChainPage/components/UsageDataSection/const';
import { getPrivateUsageData } from 'domains/chains/screens/ChainPage/components/UsageDataSection/components/PrivateUsageDataSection/PrivateUsageDataSectionUtils';
import { getStatsChainId } from 'domains/chains/screens/ChainPage/components/ChainItemSections/utils/getStatsChainId';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useChainProtocolContext } from 'domains/chains/screens/ChainPage/hooks/useChainProtocolContext';
import { useEnterpriseStats } from 'domains/enterprise/hooks/useEnterpriseStats';

export const useEnterpriseUsageData = ({
  chain,
  chainSubType,
  chainType,
  group: endpointGroup,
  timeframe,
}: UsageDataParams) => {
  const { loading: isConnecting } = useAuth();

  const { chainProtocol, isChainProtocolSwitchEnabled } =
    useChainProtocolContext();

  const chainId = getStatsChainId({
    chainProtocol,
    chainSubType,
    chainType,
    group: endpointGroup,
    isChainProtocolSwitchEnabled,
    publicChain: chain,
  });

  const enterpriseCheckedChainId = checkPrivateChainsAndGetChainId(chainId);

  const {
    error: enterpriseStatsError,
    loading: enterpriseStatsLoading,
    stats: enterpriseStats,
  } = useEnterpriseStats({
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
        arePrivateStatsLoading: enterpriseStatsLoading,
        privateStatsError: enterpriseStatsError,
        privateStats: enterpriseStats[enterpriseCheckedChainId],
        timeframe,
        userTopRequests,
      }),
    [
      enterpriseCheckedChainId,
      enterpriseStats,
      enterpriseStatsError,
      enterpriseStatsLoading,
      isConnecting,
      timeframe,
      userTopRequests,
    ],
  );

  return enterpriseUsageData;
};
