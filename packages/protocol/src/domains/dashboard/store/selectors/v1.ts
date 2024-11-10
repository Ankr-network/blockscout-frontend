import { ChainID } from '@ankr.com/chains-list';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import {
  IFetchJWTsParams,
  selectJWTs,
} from 'domains/jwtToken/action/fetchJWTs';
import {
  IFetchPrivateStatsByTokenParams,
  selectPrivateStatsByToken,
} from 'modules/stats/actions/fetchPrivateStatsByToken';
import {
  IFetchPrivateStatsParams,
  selectPrivateStats as selectPrivateStatsResponse,
} from 'modules/stats/actions/fetchPrivateStats';
import {
  IFetchPrivateTotalStatsParams,
  selectPrivateTotalStats,
} from 'modules/stats/actions/fetchPrivateTotalStats';
import { IFetchProjectsStatsParams } from 'domains/dashboard/actions/fetchProjectsStats';
import { aggregateRequests } from 'modules/stats/utils/aggregateRequests';
import { chainsFetchChainNodesDetail } from 'modules/chains/actions/fetchChainNodesDetail';
import { checkChainWithSubnetsAndGetChainId } from 'domains/chains/utils/chainsUtils';
import { getAllChainsRequests } from 'modules/stats/utils/getAllChainsRequests';
import { mapCountsToEntries } from 'modules/stats/utils/mapCountsToEntries';
import { maskText } from 'modules/common/utils/maskText';
import { selectPublicBlockchains } from 'modules/chains/store/selectors';
import { selectSelectedProject } from 'domains/jwtToken/store/selectors';

import { ChainCalls } from '../../screens/Dashboard/types';
import { ICurrentProjectsStats } from '../types';
import { aggregateMethodCallsRequests } from '../utils/aggregateMethodCallsRequests';
import { findDetailsById } from '../utils/findDetailsById';
import { getChainNamesMap } from '../utils/getChainNamesMap';
import { getProjectsPieChartData } from '../utils/getProjectsPieChartData';

interface IStatsParamsForSelectedProject
  extends Omit<IFetchPrivateStatsByTokenParams, 'token'> {}

export const selectChainNodeDetails = createSelector(
  chainsFetchChainNodesDetail.select(),
  ({ data = [] }) => data,
);

export const selectPrivateStats = createSelector(
  selectPrivateStatsResponse,
  ({ stats = {} }) => stats,
);

export const selectPrivateStatsBySelectedProjects = createSelector(
  selectSelectedProject,
  (state: RootState, { group, interval }: IStatsParamsForSelectedProject) => ({
    group,
    interval,
    state,
  }),
  (selectedProject, { group, interval, state }) => {
    if (selectedProject) {
      const { stats = {} } = selectPrivateStatsByToken(state, {
        group,
        interval,
        token: selectedProject,
      });

      return stats;
    }

    return {};
  },
);

export const selectChainStats = createSelector(
  selectPrivateStats,
  // 3 args described to fit first selelector interface and avoid args overlap
  (_state: RootState, _arg: IFetchPrivateStatsParams, chainID: ChainID) =>
    chainID,
  (stats, chainID) => stats[chainID],
);

export const selectChainStatsBySelectedProject = createSelector(
  selectPrivateStatsBySelectedProjects,
  (
    _state: RootState,
    _params: IStatsParamsForSelectedProject,
    chainID: ChainID,
  ) => chainID,
  (stats, chainID) => stats[chainID],
);

export const selectChainsWithStats = createSelector(selectPrivateStats, stats =>
  Object.keys(stats),
);

export const selectChainsWithStatsBySelectedProject = createSelector(
  selectPrivateStatsBySelectedProjects,
  stats => Object.keys(stats),
);

export const selectTotalRequests = createSelector(selectPrivateStats, stats =>
  aggregateRequests(getAllChainsRequests(stats)),
);

export const selectTotalRequestsBySelectedProject = createSelector(
  selectPrivateStatsBySelectedProjects,
  stats => aggregateRequests(getAllChainsRequests(stats)),
);

export const selectTotalRequestsByChainID = createSelector(
  selectChainStats,
  stats => Object.fromEntries(mapCountsToEntries(stats?.counts)),
);

export const selectTotalRequestsByChainIDBySelectedProject = createSelector(
  selectChainStatsBySelectedProject,
  stats => Object.fromEntries(mapCountsToEntries(stats?.counts)),
);

export const selectTotalRequestsNumber = createSelector(
  selectPrivateStatsResponse,
  stats => stats.total_requests || 0,
);

export const selectTotalRequestsNumberBySelectedProject = createSelector(
  selectPrivateStatsByToken,
  stats => stats.total_requests || 0,
);

export const selectTotalRequestsNumberByChainID = createSelector(
  selectChainStats,
  stats => stats?.total_requests || 0,
);

export const selectTotalRequestsNumberByChainIDBySelectedProject =
  createSelector(
    selectChainStatsBySelectedProject,
    stats => stats?.total_requests || 0,
  );

export const selectMethodCallsByChainID = createSelector(
  selectChainStats,
  stats => aggregateMethodCallsRequests(stats),
);

export const selectMethodCallsByChainIDBySelectedProject = createSelector(
  selectChainStatsBySelectedProject,
  stats => aggregateMethodCallsRequests(stats),
);

export const selectChainNamesMap = createSelector(
  selectPublicBlockchains,
  blockchains => getChainNamesMap(blockchains),
);

export const selectChainCalls = createSelector(
  selectPrivateStats,
  selectChainNamesMap,
  (stats, map) =>
    Object.entries(stats).map<ChainCalls>(([chainID, stat]) => ({
      name: map[chainID],
      calls: stat?.total_requests || 0,
    })),
);

export const selectChainCallsBySelectedProject = createSelector(
  selectPrivateStatsBySelectedProjects,
  selectChainNamesMap,
  (stats, map) =>
    Object.entries(stats).map<ChainCalls>(([chainID, stat]) => ({
      name: map[chainID],
      calls: stat?.total_requests || 0,
    })),
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

export const selectCurrentProjectsStats = createSelector(
  selectJWTs,
  (
    state: RootState,
    { group }: IFetchJWTsParams,
    interval: IFetchProjectsStatsParams['interval'],
  ) => ({ group, interval, state }),
  (projects, { group, interval, state }) =>
    projects.map<ICurrentProjectsStats>(
      ({ index, name, userEndpointToken: token }) => ({
        index,
        name,
        stats: selectPrivateStatsByToken(state, {
          group,
          interval,
          token,
        }),
      }),
    ),
);

export const selectCurrentProjectsPieChartData = createSelector(
  selectPrivateStatsResponse,
  (state: RootState, { group, interval }: IFetchPrivateStatsParams) => ({
    group,
    interval,
    state,
  }),
  ({ total_requests: totalRequests = 0 }, { group, interval, state }) => {
    const projectsStats = selectCurrentProjectsStats(
      state,
      { group },
      interval,
    );

    return getProjectsPieChartData({ projectsStats, totalRequests });
  },
);

export const selectTotalStats = createSelector(
  selectPrivateTotalStats,
  selectSelectedProject,
  (totalStats, project = '') => {
    const token = maskText({ mask: '*****', text: project });

    return token ? totalStats?.premium_tokens?.[token] : totalStats;
  },
);

export const selectAllTimeTotalRequestsNumber = createSelector(
  selectTotalStats,
  (_state: RootState, _arg: IFetchPrivateTotalStatsParams, chainID?: ChainID) =>
    chainID,
  (data, chainID) =>
    chainID && data?.blockchains
      ? data?.blockchains[chainID]?.total_count || 0
      : data?.total_count || 0,
);
