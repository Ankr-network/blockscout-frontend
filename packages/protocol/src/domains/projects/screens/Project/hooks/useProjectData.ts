import { ESortChainsType } from '@ankr.com/chains-list';
import { WhitelistItem } from 'multirpc-sdk';
import { useMemo } from 'react';

import { selectConfiguredBlockchainsForToken } from 'modules/chains/store/selectors';
import { sortPrivateChains } from 'domains/chains/screens/ChainsListPage/components/PrivateChains/hooks/utils';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectWhitelist } from 'domains/projects/screens/Project/hooks/useProjectWhitelist';
import { useProjectWhitelistBlockchains } from 'domains/projects/hooks/useProjectWhitelistBlockchains';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useFetchProjectStats } from './useFetchProjectStats';

const defaultWhitelist: WhitelistItem[] = [];

export const useProjectData = (userEndpointToken?: string) => {
  const { isLoading: isProjectWhitelistLoading, projectWhitelist } =
    useProjectWhitelist();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const whitelist = projectWhitelist?.lists || defaultWhitelist;

  const {
    loading: projectBlockchainsLoading,
    projectWhitelistBlockchains: projectBlockchains,
  } = useProjectWhitelistBlockchains({
    group,
    token: userEndpointToken!,
    skipFetching: !userEndpointToken,
  });

  const chains = useAppSelector(state =>
    selectConfiguredBlockchainsForToken(state, userEndpointToken),
  );

  const { isLoading: isLoadingStats, stats } = useFetchProjectStats();

  const sortedByUsageChains = useMemo(
    () =>
      sortPrivateChains({
        chains,
        sortType: ESortChainsType.UsageHighLow,
        stats,
      }),
    [stats, chains],
  );

  const isLoading =
    isProjectWhitelistLoading || projectBlockchainsLoading || isLoadingStats;

  return {
    chains: sortedByUsageChains,
    isLoading,
    projectBlockchains,
    whitelist,
  };
};
