import { createSelector } from '@reduxjs/toolkit';
import { ChainID } from '@ankr.com/chains-list';

import {
  FetchPrivateStatsParams as PrivateStatsParams,
  fetchPrivateStats,
} from 'domains/chains/actions/private/fetchPrivateStats';
import { RootState } from 'store';
import { chainsFetchChainNodesDetail } from 'modules/chains/actions/fetchChainNodesDetail';
import { checkChainWithSubnetsAndGetChainId } from 'domains/chains/utils/chainsUtils';
import { maskText } from 'modules/common/utils/maskText';
import { selectSelectedProject } from 'domains/jwtToken/store/selectors';
import { fetchLastMonthStats } from 'modules/stats/actions/fetchLastMonthStats';
import { aggregateRequests } from 'modules/stats/utils/aggregateRequests';
import { getAllChainsRequests } from 'modules/stats/utils/getAllChainsRequests';
import { mapCountsToEntries } from 'modules/stats/utils/mapCountsToEntries';
import { selectPublicBlockchains } from 'modules/chains/store/selectors';

import { ChainCalls } from '../../screens/Dashboard/types';
import { aggregateIPRequests } from '../utils/aggregateIPRequests';
import { aggregateMethodCallsRequests } from '../utils/aggregateMethodCallsRequests';
import { aggregateTopCountries } from '../utils/aggregateTopCountries';
import { aggregateUsageHistory } from '../utils/aggregateUsageHistory';
import {
  AllProjectsStatsParams,
  fetchAllProjectsStats,
} from '../../actions/fetchAllProjectsStats';
import { fetchAllProjectsTotalRequests } from '../../actions/fetchAllProjectsTotalRequests';
import { fetchUserTotalStats } from '../../actions/fetchUserTotalStats';
import { getAllChainsIPRequests } from '../utils/getAllChainsIPRequests';
import { getAllChainsTopCountries } from '../utils/getAllChainsTopCountries';
import { getChainNamesMap } from '../utils/getChainNamesMap';
import { getLocations } from '../utils/getLocations';
import { getProjectsStats } from '../utils/getProjectsStats';
import { getUsageHistoryData } from '../utils/getUsageHistoryData';
import { sortIPRequests } from '../utils/sortIPRequests';
import { sortTopCountries } from '../utils/sortTopCountries';
import { findDetailsById } from '../utils/findDetailsById';
import { fetchMonthlyUsageHistory } from '../../actions/fetchMonthlyUsageHistory';

export const selectStatsData = createSelector(
  fetchPrivateStats.select(undefined as unknown as PrivateStatsParams),
  ({ data = {} }) => data,
);

export const selectLastMonthStatsData = createSelector(
  fetchLastMonthStats.select({}),
  ({ data = {} }) => data,
);

export const selectChainNodeDetails = createSelector(
  chainsFetchChainNodesDetail.select(),
  ({ data = [] }) => data,
);

export const selectStats = createSelector(
  selectStatsData,
  ({ stats = {} }) => stats,
);

export const selectLastMonthStats = createSelector(
  selectLastMonthStatsData,
  ({ stats = {} }) => stats,
);

export const selectChainStats = createSelector(
  selectStats,
  (_state: RootState, chainID: ChainID) => chainID,
  (stats, chainID) => stats[chainID],
);

export const selectLastMonthChainStats = createSelector(
  selectLastMonthStats,
  (_state: RootState, chainID: ChainID) => chainID,
  (stats, chainID) => stats[chainID],
);

export const selectChainsWithStats = createSelector(selectStats, stats =>
  Object.keys(stats),
);

export const selectTotalRequests = createSelector(selectStats, stats =>
  aggregateRequests(getAllChainsRequests(stats)),
);

export const selectTotalRequestsByChainID = createSelector(
  selectChainStats,
  stats => Object.fromEntries(mapCountsToEntries(stats?.counts)),
);

export const selectTotalRequestsNumber = createSelector(
  selectStatsData,
  stats => stats.totalRequests || 0,
);

export const selectTotalRequestsNumberByChainID = createSelector(
  selectChainStats,
  stats => stats?.total_requests || 0,
);

export const selectMethodCallsByChainID = createSelector(
  selectChainStats,
  stats => aggregateMethodCallsRequests(stats),
);

export const selectChainNamesMap = createSelector(
  selectPublicBlockchains,
  blockchains => getChainNamesMap(blockchains),
);

export const selectChainCalls = createSelector(
  selectStats,
  selectChainNamesMap,
  (stats, map) =>
    Object.entries(stats).map<ChainCalls>(([chainID, stat]) => ({
      name: map[chainID],
      calls: stat?.total_requests || 0,
    })),
);

export const selectIPRequests = createSelector(selectLastMonthStats, stats =>
  aggregateIPRequests(getAllChainsIPRequests(stats)),
);

export const selectIPRequestsByChainID = createSelector(
  selectLastMonthChainStats,
  stats => sortIPRequests(stats?.ips_count?.top_ips),
);

export const selectTopCountries = createSelector(selectLastMonthStats, stats =>
  aggregateTopCountries(getAllChainsTopCountries(stats)),
);

export const selectTopCountriesByChainID = createSelector(
  selectLastMonthChainStats,
  stats => sortTopCountries(stats?.countries_count?.top_countries),
);

export const selectUsageHistory = createSelector(
  selectLastMonthStats,
  stats => {
    const requests = aggregateRequests(getAllChainsRequests(stats));

    return getUsageHistoryData(aggregateUsageHistory(requests));
  },
);

export const selectMonthlyUsageHistory = createSelector(
  fetchMonthlyUsageHistory.select({}),
  ({ data = [] }) => data,
);

export const selectLocations = createSelector(
  selectChainNodeDetails,
  details => {
    const nodeDetails = details.flatMap(({ nodes }) => nodes);

    return getLocations(nodeDetails);
  },
);

export const selectLocationsLoading = createSelector(
  chainsFetchChainNodesDetail.select(),
  ({ isLoading }) => isLoading,
);

export const selectLocationsByChainID = createSelector(
  selectChainNodeDetails,
  (_state: RootState, chainID?: ChainID) =>
    checkChainWithSubnetsAndGetChainId(chainID),
  (details, chainID) => {
    const detail = details.find(({ id }) => findDetailsById(id, chainID));

    return getLocations(detail?.nodes);
  },
);

export const selectBlockHeight = createSelector(
  selectChainNodeDetails,
  (_state: RootState, chainID?: ChainID) =>
    checkChainWithSubnetsAndGetChainId(chainID),
  (details, chainID) => {
    const detail = details.find(({ id }) => findDetailsById(id, chainID));

    const blockHeight = detail?.nodes?.find(node => node.height > 0)?.height;

    return blockHeight;
  },
);

export const selectProjectsTotalRequestNumber = createSelector(
  fetchAllProjectsTotalRequests.select(
    undefined as unknown as PrivateStatsParams,
  ),
  ({ data = 0 }) => data,
);

export const selectProjectsStats = createSelector(
  fetchAllProjectsStats.select(undefined as unknown as AllProjectsStatsParams),
  selectProjectsTotalRequestNumber,
  ({ data = [] }, totalRequests) => getProjectsStats(data, totalRequests),
);

export const selectTotalStats = createSelector(
  fetchUserTotalStats.select({}),
  selectSelectedProject,
  ({ data }, project = '') => {
    const token = maskText({ mask: '*****', text: project });

    return token ? data?.premium_tokens?.[token] : data;
  },
);

export const selectAllTimeTotalRequestsNumber = createSelector(
  selectTotalStats,
  (_state: RootState, chainID?: ChainID) => chainID,
  (data, chainID) =>
    chainID && data?.blockchains
      ? data?.blockchains[chainID]?.total_count || 0
      : data?.total_count || 0,
);

export const selectTotalStatsLoading = createSelector(
  fetchUserTotalStats.select({}),
  ({ isLoading }) => isLoading,
);
