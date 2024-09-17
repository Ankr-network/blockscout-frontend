import { UserEndpointTokenMode } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';
import { ChainID } from '@ankr.com/chains-list';

import { EMilliSeconds } from 'modules/common/constants/const';
import { RootState } from 'store';
import { selectCurrentAddress } from 'domains/auth/store';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';

import { NewProjectStep } from '../types';
import { ProjectActivity } from './types';
import { fetchAllProjectsTotalRequestsForLastTwoDays } from '../actions/fetchAllProjectsTotalRequestsForLastTwoDays';
import {
  IFetchProjectChainsStatsFor1hParams,
  selectStateForLastHourChainsStats,
} from '../actions/fetchProjectChainsStatsFor1h';
import {
  IFetchProjectChainsStatsFor24hParams,
  selectStateForLastDayChainsStats,
} from '../actions/fetchProjectChainsStatsFor24h';
import { fetchProjectTotalRequestsForLastTwoDays } from '../actions/fetchProjectTotalRequestsForLastTwoDays';
import { fetchProjectTotalRequestsForLastTwoHours } from '../actions/fetchProjectTotalRequestsForLastTwoHours';
import { fetchProjectWhitelist } from '../actions/fetchProjectWhitelist';
import { filterTotalRequests } from './utils/filterTotalRequests';
import { getRelativeChange } from './utils/getRelativeChange';
import { sumTotalRequests } from './utils/sumTotalRequests';
import { sumSubchainsTotalRequest } from './utils/sumSubchainsTotalRequest';
import { aggregatePrivateStatsByChain } from '../utils/aggregatePrivateStatsByChain';

const selectNewProject = (state: RootState) => state.newProject;

const actionSelectParams = undefined as never;

export const selectNewProjectConfig = createSelector(
  selectNewProject,
  selectCurrentAddress,
  (newProject, address) => newProject[address] || {},
);

export const selectDraftTokenIndex = createSelector(
  selectNewProjectConfig,
  ({ project = {} }) => project?.[NewProjectStep.General]?.tokenIndex,
);

export const selectDraftUserEndpointToken = createSelector(
  selectNewProjectConfig,
  ({ project = {} }) => project?.[NewProjectStep.General]?.userEndpointToken,
);

export const selectProjectWhitelistState = createSelector(
  fetchProjectWhitelist.select(actionSelectParams),
  state => state,
);

export const selectProjectWhitelist = createSelector(
  selectProjectWhitelistState,
  ({ data }) => data?.lists || [],
);

export const selectProjectWhitelistByType = createSelector(
  selectProjectWhitelist,
  (_state: RootState, type: UserEndpointTokenMode) => type,
  (whitelist, type) => whitelist.filter(item => item.type === type),
);

export const selectAggregatedStatsByChainFor1hState = createSelector(
  (state: RootState, params: IFetchProjectChainsStatsFor1hParams) => ({
    params,
    state,
  }),
  ({ params, state }) => {
    const statsState = selectStateForLastHourChainsStats(state, params);

    return aggregatePrivateStatsByChain(state, statsState?.data);
  },
);

export const selectAggregatedStatsByChainFor24hState = createSelector(
  (state: RootState, params: IFetchProjectChainsStatsFor24hParams) => ({
    params,
    state,
  }),
  ({ params, state }) => {
    const statsState = selectStateForLastDayChainsStats(state, params);

    return aggregatePrivateStatsByChain(state, statsState?.data);
  },
);

export const selectProjectTotalRequestsForLastTwoHoursState = createSelector(
  fetchProjectTotalRequestsForLastTwoHours.select(actionSelectParams),
  state => state,
);

export const selectProjectTotalRequestsForLastTwoHoursLoading = createSelector(
  selectProjectTotalRequestsForLastTwoHoursState,
  ({ isLoading }) => isLoading,
);

export const selectProjectTotalRequestsForLastTwoHours = createSelector(
  selectProjectTotalRequestsForLastTwoHoursState,
  ({ data = {} }) => data,
);

export const selectProjectTotalRequestsForLastTwoHoursTimestamp =
  createSelector(
    selectProjectTotalRequestsForLastTwoHoursState,
    ({ startedTimeStamp = Date.now() }) => startedTimeStamp,
  );

export const selectProjectTotalRequestsForLastHour = createSelector(
  selectProjectTotalRequestsForLastTwoHours,
  selectProjectTotalRequestsForLastTwoHoursTimestamp,
  (totalRequests, now) => {
    const hourAgo = now - EMilliSeconds.Hour;
    const filter = (timestamp: number) => timestamp > hourAgo;

    return filterTotalRequests({ filter, totalRequests });
  },
);

export const selectProjectTotalRequestsCountForLastHour = createSelector(
  selectProjectTotalRequestsForLastHour,
  lastHourRequests => sumTotalRequests(lastHourRequests),
);

export const selectProjectTotalRequestsForPreviousHour = createSelector(
  selectProjectTotalRequestsForLastTwoHours,
  selectProjectTotalRequestsForLastTwoHoursTimestamp,
  (totalRequests, now) => {
    const hourAgo = now - EMilliSeconds.Hour;
    const filter = (timestamp: number) => timestamp < hourAgo;

    return filterTotalRequests({ filter, totalRequests });
  },
);

export const selectProjectTotalRequestsCountForPreviousHour = createSelector(
  selectProjectTotalRequestsForPreviousHour,
  previousHourRequests => sumTotalRequests(previousHourRequests),
);

export const selectRelativeChangeForLastHour = createSelector(
  selectProjectTotalRequestsCountForLastHour,
  selectProjectTotalRequestsCountForPreviousHour,
  (lastHourCount, previousHourCount) =>
    getRelativeChange({
      currentValue: lastHourCount,
      previousValue: previousHourCount,
    }),
);

export const selectProjectTotalRequestsForLastTwoDaysState = createSelector(
  fetchProjectTotalRequestsForLastTwoDays.select(actionSelectParams),
  state => state,
);

export const selectProjectTotalRequestsForLastTwoDaysLoading = createSelector(
  selectProjectTotalRequestsForLastTwoDaysState,
  ({ isLoading }) => isLoading,
);

export const selectProjectTotalRequestsForLastTwoDays = createSelector(
  selectProjectTotalRequestsForLastTwoDaysState,
  ({ data = {} }) => data,
);

export const selectProjectTotalRequestsForLastTwoDaysTimestamp = createSelector(
  selectProjectTotalRequestsForLastTwoDaysState,
  ({ startedTimeStamp = Date.now() }) => startedTimeStamp,
);

export const selectProjectTotalRequestsForLastDay = createSelector(
  selectProjectTotalRequestsForLastTwoDays,
  selectProjectTotalRequestsForLastTwoDaysTimestamp,
  (totalRequests, now) => {
    const dayAgo = now - EMilliSeconds.Day;
    const filter = (timestamp: number) => timestamp > dayAgo;

    return filterTotalRequests({ filter, totalRequests });
  },
);

export const selectProjectTotalRequestsCountForLastDay = createSelector(
  selectProjectTotalRequestsForLastDay,
  lastDayRequests => sumTotalRequests(lastDayRequests),
);

export const selectProjectTotalRequestsForPreviousDay = createSelector(
  selectProjectTotalRequestsForLastTwoDays,
  selectProjectTotalRequestsForLastTwoDaysTimestamp,
  (totalRequests, now) => {
    const dayAgo = now - EMilliSeconds.Day;
    const filter = (timestamp: number) => timestamp < dayAgo;

    return filterTotalRequests({ filter, totalRequests });
  },
);

export const selectProjectTotalRequestsCountForPreviousDay = createSelector(
  selectProjectTotalRequestsForPreviousDay,
  previousDayRequests => sumTotalRequests(previousDayRequests),
);

export const selectRelativeChangeForLastDay = createSelector(
  selectProjectTotalRequestsCountForLastDay,
  selectProjectTotalRequestsCountForPreviousDay,
  (lastDayCount, previousDayCount) =>
    getRelativeChange({
      currentValue: lastDayCount,
      previousValue: previousDayCount,
    }),
);

export const selectProjectTotalRequestsFor1hByChain = createSelector(
  (
    state: RootState,
    chainId: ChainID,
    params: IFetchProjectChainsStatsFor1hParams,
  ) => ({ state, chainId, params }),
  ({ chainId, params, state }) => {
    const { data } = selectStateForLastHourChainsStats(state, params);
    const relatedPaths = selectAllPathsByChainId(state, chainId);

    return sumSubchainsTotalRequest(relatedPaths, data);
  },
);

export const selectProjectTotalRequestsFor24hByChain = createSelector(
  (
    state: RootState,
    chainId: ChainID,
    params: IFetchProjectChainsStatsFor24hParams,
  ) => ({ state, chainId, params }),
  ({ chainId, params, state }) => {
    const { data } = selectStateForLastDayChainsStats(state, params);
    const relatedPaths = selectAllPathsByChainId(state, chainId);

    return sumSubchainsTotalRequest(relatedPaths, data);
  },
);

export const selectAllProjectsTotalRequestsState = createSelector(
  fetchAllProjectsTotalRequestsForLastTwoDays.select(actionSelectParams),
  state => state,
);

export const selectAllProjectsTotalRequestsLoading = createSelector(
  selectAllProjectsTotalRequestsState,
  ({ isLoading }) => isLoading,
);

export const selectAllProjectsTotalRequests = createSelector(
  selectAllProjectsTotalRequestsState,
  ({ data = {} }) => data,
);

export const selectAllProjectsTotalRequestsTimestamp = createSelector(
  selectAllProjectsTotalRequestsState,
  ({ startedTimeStamp = Date.now() }) => startedTimeStamp,
);

export const selectAllProjectsActivity = createSelector(
  selectAllProjectsTotalRequests,
  selectAllProjectsTotalRequestsTimestamp,
  (totalRequests, now) => {
    const dayAgo = now - EMilliSeconds.Day;

    const filterLastDay = (timestamp: number) => timestamp > dayAgo;
    const filterPreviousDay = (timestamp: number) => timestamp < dayAgo;

    return Object.fromEntries(
      Object.entries(totalRequests).map(
        ([token, { data: projectTotalRequests = {} }]) => {
          const projectTotalRequestsForLastDay = filterTotalRequests({
            filter: filterLastDay,
            totalRequests: projectTotalRequests,
          });

          const projectTotalRequestsCountForLastDay = sumTotalRequests(
            projectTotalRequestsForLastDay,
          );

          const projectTotalRequestsForPreviousDay = filterTotalRequests({
            filter: filterPreviousDay,
            totalRequests: projectTotalRequests,
          });

          const projectTotalRequestsCountForPrevousDay = sumTotalRequests(
            projectTotalRequestsForPreviousDay,
          );

          const hasData =
            Object.keys(projectTotalRequestsForLastDay).length > 0;

          const isEmpty = !hasData || projectTotalRequestsCountForLastDay === 0;

          const projectActivity: ProjectActivity = {
            hasData,
            isEmpty,
            totalRequestsCount: projectTotalRequestsCountForLastDay,
            relativeChange: getRelativeChange({
              currentValue: projectTotalRequestsCountForLastDay,
              previousValue: projectTotalRequestsCountForPrevousDay,
            }),
          };

          return [token, projectActivity];
        },
      ),
    );
  },
);
