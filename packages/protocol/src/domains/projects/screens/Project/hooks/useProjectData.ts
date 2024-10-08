import { WhitelistItem } from 'multirpc-sdk';
import { useLayoutEffect, useMemo } from 'react';
import { ESortChainsType } from '@ankr.com/chains-list';

import { fetchProjectWhitelist } from 'domains/projects/actions/fetchProjectWhitelist';
import { selectConfiguredBlockchainsForToken } from 'modules/chains/store/selectors';
import { sortPrivateChains } from 'domains/chains/screens/ChainsListPage/components/PrivateChains/hooks/utils';
import { useAppSelector } from 'store/useAppSelector';
import { useProjectWhitelist } from 'domains/projects/screens/Project/hooks/useProjectWhitelist';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { useFetchProjectStats } from './useFetchProjectStats';
import { useWhitelistBlockchains } from './useWhitelistBlockchains';

const defaultWhitelist: WhitelistItem[] = [];

export const useProjectData = (userEndpointToken?: string) => {
  const { data: projectWhitelistData, isLoading: isProjectWhitelistLoading } =
    useProjectWhitelist();

  const [, , reset] = useQueryEndpoint(fetchProjectWhitelist);

  // project whitelists endpoint data should be cleared on component rerender
  // in order to trigger refetch data on different projects pages
  useLayoutEffect(reset, [reset]);

  const whitelist = projectWhitelistData?.lists || defaultWhitelist;

  const {
    blockchains: projectBlockchains,
    isLoading: isProjectBlockchainsLoading,
  } = useWhitelistBlockchains();

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
    isProjectWhitelistLoading || isProjectBlockchainsLoading || isLoadingStats;

  return {
    chains: sortedByUsageChains,
    isLoading,
    projectBlockchains,
    whitelist,
  };
};
