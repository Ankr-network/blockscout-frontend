import { Chain, Timeframe } from 'modules/chains/types';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useProjectsDataParams } from 'domains/projects/hooks/useProjectsDataParams';
import { useFetchWhitelistsBlockchainsQuery } from 'domains/projects/actions/fetchWhitelistsBlockchains';
import { useFetchAllJwtTokensStatusesQuery } from 'domains/jwtToken/action/getAllJwtTokensStatuses';
import { useFetchAllProjectsTotalRequestsForLastTwoDaysQuery } from 'domains/projects/actions/fetchAllProjectsTotalRequestsForLastTwoDays';

import { useTimeframe } from '../ChainItemSections/hooks/useTimeframe';

export interface IChainProjectsSectionProps {
  chain: Chain;
  onOpenAddToProjectsDialog: () => void;
  isLoadingTokenManager: boolean;
  jwtTokens: JwtManagerToken[];
  shouldShowTokenManager: boolean;
}

export const useChainProjects = ({
  isLoadingTokenManager,
  jwtTokens,
}: Partial<IChainProjectsSectionProps>) => {
  const { timeframe, timeframeTabs } = useTimeframe({
    initialTimeframe: Timeframe.Day,
    timeframes: [Timeframe.Hour, Timeframe.Day],
  });

  const {
    allTotalRequestsParams,
    allWhitelistsBlockchainsParams,
    statusesParams,
  } = useProjectsDataParams({
    jwts: jwtTokens,
    jwtsFetching: isLoadingTokenManager,
  });

  const { isLoading: isLoadingWhitelistsBlockchains } =
    useFetchWhitelistsBlockchainsQuery(allWhitelistsBlockchainsParams);
  const { isLoading: isLoadingAllJwtTokensStatuses } =
    useFetchAllJwtTokensStatusesQuery(statusesParams);
  const { isLoading: isLoadingAllProjectsTotalRequestsForLastTwoDays } =
    useFetchAllProjectsTotalRequestsForLastTwoDaysQuery(allTotalRequestsParams);

  const isLoading =
    isLoadingWhitelistsBlockchains ||
    isLoadingAllJwtTokensStatuses ||
    isLoadingAllProjectsTotalRequestsForLastTwoDays;

  return {
    timeframe,
    timeframeTabs,
    isLoading,
  };
};
