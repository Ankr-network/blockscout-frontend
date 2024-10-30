import { ChainID } from '@ankr.com/chains-list';
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import {
  IFetchJWTsParams,
  selectJWTs,
} from 'domains/jwtToken/action/fetchJWTs';
import { RootState } from 'store';
import { deepEqulityCheck } from 'modules/common/utils/deepEqualityCheck';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { selectCurrentAddress } from 'domains/auth/store';

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
import { IProjectWithBlockchains, NewProjectStep } from '../types';
import { aggregatePrivateStatsByChain } from '../utils/aggregatePrivateStatsByChain';
import { filterTotalRequests } from './utils/filterTotalRequests';
import { getHalfDuration } from './utils/getHalfDuration';
import { getRelativeChange } from './utils/getRelativeChange';
import { selectProjectWhitelist } from '../actions/fetchProjectWhitelist';
import { selectProjectWhitelistBlockchains } from '../actions/fetchProjectWhitelistBlockchains';
import { selectProjectsWhitelistsBlockchainsLoading } from '../actions/fetchProjectsWhitelistsBlockchains';
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
    const filter = (timestamp: number) => timestamp > halfOfDurationAgo;

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
    const filter = (timestamp: number) => timestamp < halfOfDurationAgo;

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

export const selectCurrentProjectsWhitelistsBlockchainsLoading = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => [state, group] as const,
  (projects, [state, group]) =>
    selectProjectsWhitelistsBlockchainsLoading(state, { group, projects }),
);

export const selectCurrentProjectsWhitelistsBlockchains = createSelector(
  selectJWTs,
  (state: RootState, { group }: IFetchJWTsParams) => ({ group, state }),
  (projects, { group, state }) =>
    projects.map<IProjectWithBlockchains>(
      ({ index, name, userEndpointToken: token }) => ({
        blockchains: selectProjectWhitelistBlockchains(state, { group, token }),
        index,
        name,
        userEndpointToken: token,
      }),
    ),
  {
    memoizeOptions: {
      equalityCheck: deepEqulityCheck,
      resultEqualityCheck: deepEqulityCheck,
    },
  },
);
