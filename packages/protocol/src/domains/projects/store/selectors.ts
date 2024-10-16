import { UserEndpointTokenMode } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';
import { ChainID } from '@ankr.com/chains-list';

import { EMilliSeconds } from 'modules/common/constants/const';
import { RootState } from 'store';
import { selectCurrentAddress } from 'domains/auth/store';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';

import {
  IFetchProjectChainsStatsFor1hParams,
  selectProjectChainsStatsFor1h,
} from '../actions/fetchProjectChainsStatsFor1h';
import {
  IFetchProjectChainsStatsFor24hParams,
  selectProjectChainsStatsFor24h,
} from '../actions/fetchProjectChainsStatsFor24h';
import { NewProjectStep } from '../types';
import { ProjectActivity } from './types';
import { aggregatePrivateStatsByChain } from '../utils/aggregatePrivateStatsByChain';
import { fetchAllProjectsTotalRequestsForLastTwoDays } from '../actions/fetchAllProjectsTotalRequestsForLastTwoDays';
import { filterTotalRequests } from './utils/filterTotalRequests';
import { getRelativeChange } from './utils/getRelativeChange';
import {
  selectProjectTotalRequestsForLastTwoDays,
  selectProjectTotalRequestsForLastTwoDaysState,
} from '../actions/fetchProjectTotalRequestsForLastTwoDays';
import {
  selectProjectTotalRequestsForLastTwoHours,
  selectProjectTotalRequestsForLastTwoHoursState,
} from '../actions/fetchProjectTotalRequestsForLastTwoHours';
import { selectProjectWhitelist } from '../actions/fetchProjectWhitelist';
import { sumSubchainsTotalRequest } from './utils/sumSubchainsTotalRequest';
import { sumTotalRequests } from './utils/sumTotalRequests';

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

export const selectProjectWhitelistByType = createSelector(
  selectProjectWhitelist,
  (_state: RootState, { type }: { type: UserEndpointTokenMode }) => type,
  (whitelist, type) =>
    whitelist?.lists?.filter(item => item.type === type) ?? [],
);

export const selectAggregatedStatsByChainFor1hState = createSelector(
  (state: RootState, params: IFetchProjectChainsStatsFor1hParams) => ({
    params,
    state,
  }),
  ({ params, state }) => {
    const stats = selectProjectChainsStatsFor1h(state, params);

    return aggregatePrivateStatsByChain(state, stats);
  },
);

export const selectAggregatedStatsByChainFor24hState = createSelector(
  (state: RootState, params: IFetchProjectChainsStatsFor24hParams) => ({
    params,
    state,
  }),
  ({ params, state }) => {
    const stats = selectProjectChainsStatsFor24h(state, params);

    return aggregatePrivateStatsByChain(state, stats);
  },
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
    const chainsStats = selectProjectChainsStatsFor1h(state, params);
    const relatedPaths = selectAllPathsByChainId(state, chainId);

    return sumSubchainsTotalRequest(relatedPaths, chainsStats);
  },
);

export const selectProjectTotalRequestsFor24hByChain = createSelector(
  (
    state: RootState,
    chainId: ChainID,
    params: IFetchProjectChainsStatsFor24hParams,
  ) => ({ state, chainId, params }),
  ({ chainId, params, state }) => {
    const chainsStats = selectProjectChainsStatsFor24h(state, params);
    const relatedPaths = selectAllPathsByChainId(state, chainId);

    return sumSubchainsTotalRequest(relatedPaths, chainsStats);
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
