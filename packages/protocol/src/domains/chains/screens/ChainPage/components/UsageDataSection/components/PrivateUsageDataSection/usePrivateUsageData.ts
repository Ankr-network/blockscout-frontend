import { BlockchainStatsTopRequests, PrivateStats } from 'multirpc-sdk';
import {
  Chain,
  ChainID,
  ChainSubType,
  ChainType,
  Timeframe,
} from '@ankr.com/chains-list';
import { useMemo } from 'react';

import { CountryMap } from 'domains/chains/actions/public/fetchChainTimeframeData';
import { EndpointGroup } from 'modules/endpoints/types';
import { getStatsChainId } from 'domains/chains/screens/ChainPage/components/ChainItemSections/utils/getStatsChainId';
import { timeframeToIntervalMap } from 'domains/chains/constants/timeframeToIntervalMap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useEnterprisePrivateStats } from 'modules/stats/hooks/useEnterprisePrivateStats';
import { usePrivateStats } from 'modules/stats/hooks/usePrivateStats';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTop10Stats } from 'domains/dashboard/screens/Dashboard/components/AllChainsLayout/v1/hooks/useTop10Stats';

import { ChainProtocol } from '../../../../constants/ChainProtocolContext';
import { UsageData } from '../../types';
import { checkPrivateChainsAndGetChainId } from '../../const';
import { getPrivateUsageData } from './PrivateUsageDataSectionUtils';

export interface UsageDataParams {
  chain: Chain;
  chainProtocol?: ChainProtocol;
  chainSubType?: ChainSubType;
  chainType: ChainType;
  group: EndpointGroup;
  isChainProtocolSwitchEnabled?: boolean;
  timeframe: Timeframe;
}

export const getUserTopRequest = (
  privateStats: Partial<PrivateStats>,
  chainId: ChainID,
): BlockchainStatsTopRequests[] => {
  const othersInfo = privateStats[chainId]?.total?.others_info;

  const topRequests = privateStats[chainId]?.total?.top_requests || [];

  const othersInfoMapped: BlockchainStatsTopRequests | undefined =
    othersInfo?.type_count
      ? {
          method: `${othersInfo.type_count} other methods`,
          count: othersInfo.request_count || 0,
          total_cost: othersInfo.total_cost || 0,
        }
      : undefined;

  return othersInfoMapped ? [...topRequests, othersInfoMapped] : topRequests;
};

const defaultStats: PrivateStats = {};

export const usePrivateUsageData = ({
  chain,
  chainProtocol,
  chainSubType,
  chainType,
  group: endpointGrop,
  isChainProtocolSwitchEnabled,
  timeframe,
}: UsageDataParams): UsageData => {
  const { loading: isConnecting } = useAuth();

  const chainId = getStatsChainId({
    publicChain: chain,
    chainType,
    chainSubType,
    group: endpointGrop,
    isChainProtocolSwitchEnabled,
    chainProtocol,
  });

  const privateCheckedChainId = checkPrivateChainsAndGetChainId(chainId);

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  const isEnterprise = isEnterpriseClient && !isEnterpriseStatusLoading;

  const interval = timeframeToIntervalMap[timeframe];

  const {
    loading: privateStatsLoading,
    privateStats: { stats: privateStats = defaultStats },
    state: { error: privateStatsError },
  } = usePrivateStats({ group, interval, skipFetching: isEnterprise });

  const {
    enterprisePrivateStats: { stats: enterpriseStats = defaultStats },
    loading: enterpriseStatsLoading,
    state: { error: enterpriseStatsError },
  } = useEnterprisePrivateStats({
    group,
    interval,
    skipFetching: !isEnterprise,
  });

  const [stats, statsLoading, statsError] = isEnterprise
    ? [enterpriseStats, enterpriseStatsLoading, enterpriseStatsError]
    : [privateStats, privateStatsLoading, privateStatsError];

  const { stats: top10Stats } = useTop10Stats(timeframe, privateCheckedChainId);

  const userTopRequests = getUserTopRequest(stats, privateCheckedChainId);

  const countries: CountryMap = useMemo(() => {
    if (!top10Stats?.countries) {
      return {};
    }

    return top10Stats.countries.reduce(
      (acc, { key: country, value: requests }) => ({
        ...acc,
        [country]: { country, requests },
      }),
      {},
    );
  }, [top10Stats]);

  return {
    ...getPrivateUsageData({
      arePrivateStatsLoading: statsLoading,
      isConnecting,
      privateStats: stats[privateCheckedChainId],
      privateStatsError: statsError,
      timeframe,
      userTopRequests,
    }),
    countries,
  };
};
