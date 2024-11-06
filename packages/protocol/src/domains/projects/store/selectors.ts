import { ChainID } from '@ankr.com/chains-list';
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import {
  IFetchJWTsParams,
  selectJWTs,
} from 'domains/jwtToken/action/fetchJWTs';
import {
  IFetchPrivateStatsByTokenParams,
  selectPrivateStatsByToken,
} from 'modules/stats/actions/fetchPrivateStatsByToken';
import {
  IFetchPrivateTotalStatsByRangeParams,
  selectPrivateTotalStatsByRange,
  selectPrivateTotalStatsByRangeState,
} from 'modules/stats/actions/fetchPrivateTotalStatsByRange';
import { RootState } from 'store';
import { deepEqulityCheck } from 'modules/common/utils/deepEqualityCheck';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { selectCurrentAddress } from 'domains/auth/store';

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

export const selectProjectTotalRequestsTimestamp = createSelector(
  selectPrivateTotalStatsByRangeState,
  ({ startedTimeStamp = Date.now() }) => startedTimeStamp,
);

export const selectProjectTotalRequestsForCurrentPeriod = createSelector(
  selectPrivateTotalStatsByRange,
  selectProjectTotalRequestsTimestamp,
  (_state: RootState, { duration }: IFetchPrivateTotalStatsByRangeParams) =>
    duration,
  (totalRequests, queryTimestamp, duration) => {
    const halfOfDurationAgo = queryTimestamp - getHalfDuration(duration);
    const filter = (timestamp: number) => timestamp > halfOfDurationAgo;

    return filterTotalRequests({ filter, totalRequests });
  },
);

export const selectProjectTotalRequestsForPreviousPeriod = createSelector(
  selectPrivateTotalStatsByRange,
  selectProjectTotalRequestsTimestamp,
  (_state: RootState, { duration }: IFetchPrivateTotalStatsByRangeParams) =>
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

export const selectAggregatedByChainPrivateStats = createSelector(
  selectPrivateStatsByToken,
  (state: RootState) => state,
  (privateStats, state) => aggregatePrivateStatsByChain(state, privateStats),
);

export const selectProjectTotalRequestsByChain = createSelector(
  selectPrivateStatsByToken,
  (
    state: RootState,
    _params: IFetchPrivateStatsByTokenParams,
    chainId: ChainID,
  ) => ({ chainId, state }),
  (privateStats, { chainId, state }) => {
    const relatedPaths = selectAllPathsByChainId(state, chainId);

    return sumSubchainsTotalRequest(relatedPaths, privateStats);
  },
);
