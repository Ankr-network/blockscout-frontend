import { UserEndpointTokenMode } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import { MilliSeconds } from 'modules/common/constants/const';
import { RootState } from 'store';
import { selectCurrentAddress } from 'domains/auth/store';

import { NewProjectStep } from '../types';
import { fetchProjectChainsStatsFor1h } from '../actions/fetchProjectChainsStatsFor1h';
import { fetchProjectChainsStatsFor24h } from '../actions/fetchProjectChainsStatsFor24h';
import { fetchProjectTotalRequestsForLastTwoDays } from '../actions/fetchProjectTotalRequestsForLastTwoDays';
import { fetchProjectTotalRequestsForLastTwoHours } from '../actions/fetchProjectTotalRequestsForLastTwoHours';
import { fetchProjectWhitelist } from '../actions/fetchProjectWhitelist';
import { filterTotalRequests } from './utils/filterTotalRequests';
import { getRelativeChange } from './utils/getRelativeChange';
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

export const selectProjectWhitelistState = createSelector(
  fetchProjectWhitelist.select(actionSelectParams),
  state => state,
);

export const selectProjectWhitelist = createSelector(
  selectProjectWhitelistState,
  ({ data }) => data?.lists ?? [],
);

export const selectProjectWhitelistByType = createSelector(
  selectProjectWhitelist,
  (_state: RootState, type: UserEndpointTokenMode) => type,
  (whitelist, type) => whitelist.filter(item => item.type === type),
);

export const selectProjectChainsStatsFor1hState = createSelector(
  fetchProjectChainsStatsFor1h.select(actionSelectParams),
  state => state,
);

export const selectProjectChainsStatsFor24hState = createSelector(
  fetchProjectChainsStatsFor24h.select(actionSelectParams),
  state => state,
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
    const hourAgo = now - MilliSeconds.Hour;
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
    const hourAgo = now - MilliSeconds.Hour;
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
    const dayAgo = now - MilliSeconds.Day;
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
    const dayAgo = now - MilliSeconds.Day;
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
  selectProjectChainsStatsFor1hState,
  (_state: RootState, chainId: string) => chainId,
  ({ data }, chainId) => {
    return data?.stats?.[chainId]?.total_requests ?? 0;
  },
);

export const selectProjectTotalRequestsFor24hByChain = createSelector(
  selectProjectChainsStatsFor24hState,
  (_state: RootState, chainId: string) => chainId,
  ({ data }, chainId) => {
    return data?.stats?.[chainId]?.total_requests ?? 0;
  },
);
