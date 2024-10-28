import { StatsByRangeDuration, UserEndpointTokenMode } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';
import { ChainID } from '@ankr.com/chains-list';

import { EMilliSeconds } from 'modules/common/constants/const';
import { IFetchJWTsParams } from 'domains/jwtToken/action/fetchJWTs';
import { RootState } from 'store';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { selectCurrentAddress } from 'domains/auth/store';
import { selectUserEndpointTokens } from 'domains/jwtToken/store/selectors';

import {
  IFetchProjectChainsStatsFor1hParams,
  selectProjectChainsStatsFor1h,
} from '../actions/fetchProjectChainsStatsFor1h';
import {
  IFetchProjectChainsStatsFor24hParams,
  selectProjectChainsStatsFor24h,
} from '../actions/fetchProjectChainsStatsFor24h';
import {
  IFetchProjectTotalRequestsParams,
  selectProjectTotalRequestsState,
  selectProjectTotalRequests,
} from '../actions/fetchProjectTotalRequests';
import { NewProjectStep } from '../types';
import { ProjectActivity } from './types';
import { aggregatePrivateStatsByChain } from '../utils/aggregatePrivateStatsByChain';
import { filterTotalRequests } from './utils/filterTotalRequests';
import { getHalfDuration } from './utils/getHalfDuration';
import { getRelativeChange } from './utils/getRelativeChange';
import { selectProjectWhitelist } from '../actions/fetchProjectWhitelist';
import {
  selectProjectsTotalRequests,
  selectProjectsTotalRequestsLoading,
  selectProjectsTotalRequestsState,
} from '../actions/fetchProjectsTotalRequests';
import { sumSubchainsTotalRequest } from './utils/sumSubchainsTotalRequest';
import { sumTotalRequests } from './utils/sumTotalRequests';

const selectNewProject = (state: RootState) => state.newProject;

export const selectNewProjectConfig = createSelector(
  selectNewProject,
  selectCurrentAddress,
  (newProject, address) => newProject[address] || {},
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

export const selectProjectTotalRequestsTimestamp = createSelector(
  selectProjectTotalRequestsState,
  ({ startedTimeStamp = Date.now() }) => startedTimeStamp,
);

export const selectProjectTotalRequestsForCurrentPeriod = createSelector(
  selectProjectTotalRequests,
  selectProjectTotalRequestsTimestamp,
  (_state: RootState, { duration }: IFetchProjectTotalRequestsParams) =>
    duration,
  (totalRequests, queryTimestamp, duration) => {
    const halfOfDurationAgo = queryTimestamp - getHalfDuration(duration);
    const filter = (timestamp: number) => timestamp < halfOfDurationAgo;

    return filterTotalRequests({ filter, totalRequests });
  },
);

export const selectProjectTotalRequestsForPreviousPeriod = createSelector(
  selectProjectTotalRequests,
  selectProjectTotalRequestsTimestamp,
  (_state: RootState, { duration }: IFetchProjectTotalRequestsParams) =>
    duration,
  (totalRequests, queryTimestamp, duration) => {
    const halfOfDurationAgo = queryTimestamp - getHalfDuration(duration);
    const filter = (timestamp: number) => timestamp > halfOfDurationAgo;

    return filterTotalRequests({ filter, totalRequests });
  },
);

export const selectProjectTotalRequestsCountForCurrentPeriod = createSelector(
  selectProjectTotalRequestsForCurrentPeriod,
  currentPeriodRequests => sumTotalRequests(currentPeriodRequests),
);

export const selectProjectTotalRequestsCountForPreviousPeriod = createSelector(
  selectProjectTotalRequestsForPreviousPeriod,
  previousPeriodRequests => sumTotalRequests(previousPeriodRequests),
);

export const selectRelativeChange = createSelector(
  selectProjectTotalRequestsCountForCurrentPeriod,
  selectProjectTotalRequestsCountForPreviousPeriod,
  (currentPeriodCount, previousPeriodCount) =>
    getRelativeChange({
      currentValue: currentPeriodCount,
      previousValue: previousPeriodCount,
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

export const selectCurrentProjectsTotalRequests = createSelector(
  selectUserEndpointTokens,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (tokens, [state, group]) =>
    selectProjectsTotalRequests(state, {
      group,
      tokens,
      duration: StatsByRangeDuration.TWO_DAYS,
    }),
);

export const selectCurrentProjectsTotalRequestsLoading = createSelector(
  selectUserEndpointTokens,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (tokens, [state, group]) =>
    selectProjectsTotalRequestsLoading(state, {
      group,
      tokens,
      duration: StatsByRangeDuration.TWO_DAYS,
    }),
);

export const selectCurrentProjectsTotalRequestsState = createSelector(
  selectUserEndpointTokens,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (tokens, [state, group]) =>
    selectProjectsTotalRequestsState(state, {
      group,
      tokens,
      duration: StatsByRangeDuration.TWO_DAYS,
    }),
);

export const selectCurrentProjectsTotalRequestsTimestamp = createSelector(
  selectCurrentProjectsTotalRequestsState,
  ({ startedTimeStamp = Date.now() }) => startedTimeStamp,
);

export const selectAllProjectsActivity = createSelector(
  selectCurrentProjectsTotalRequests,
  selectCurrentProjectsTotalRequestsTimestamp,
  (totalRequests, now) => {
    const dayAgo = now - EMilliSeconds.Day;

    const filterLastDay = (timestamp: number) => timestamp > dayAgo;
    const filterPreviousDay = (timestamp: number) => timestamp < dayAgo;

    return Object.fromEntries(
      Object.entries(totalRequests).map(
        ([token, projectTotalRequests = {}]) => {
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
