import { UserEndpointTokenMode } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import { selectCurrentAddress } from 'domains/auth/store';
import { RootState } from 'store';
import { aggregateRequests } from 'modules/stats/utils/aggregateRequests';
import { getAllChainsRequests } from 'modules/stats/utils/getAllChainsRequests';

import {
  FetchProjectWhitelistParams,
  fetchProjectWhitelist,
} from '../actions/fetchProjectWhitelist';
import { NewProjectStep } from '../types';
import { chainsFetchProjectStatsFor1h } from '../actions/fetchProjectStatsFor1h';
import { chainsFetchProjectStatsFor24h } from '../actions/fetchProjectStatsFor24h';

const selectNewProject = (state: RootState) => state.newProject;

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
  fetchProjectWhitelist.select({} as unknown as FetchProjectWhitelistParams),
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

export const selectProjectStatsFor1h = createSelector(
  chainsFetchProjectStatsFor1h.select(undefined as unknown as never),
  requestState => requestState,
);

export const selectProjectStatsFor24h = createSelector(
  chainsFetchProjectStatsFor24h.select(undefined as unknown as never),
  requestState => requestState,
);

export const selectProjectTotalRequestsFor1h = createSelector(
  selectProjectStatsFor1h,
  ({ data }) => {
    return data?.stats
      ? aggregateRequests(getAllChainsRequests(data?.stats))
      : {};
  },
);

export const selectProjectTotalRequestsFor24h = createSelector(
  selectProjectStatsFor24h,
  ({ data }) => {
    return data?.stats
      ? aggregateRequests(getAllChainsRequests(data?.stats))
      : {};
  },
);

export const selectProjectTotalRequestsFor1hByChain = createSelector(
  selectProjectStatsFor1h,
  (_state: RootState, chainId: string) => chainId,
  ({ data }, chainId) => {
    return data?.stats?.[chainId]?.total_requests ?? 0;
  },
);

export const selectProjectTotalRequestsFor24hByChain = createSelector(
  selectProjectStatsFor24h,
  (_state: RootState, chainId: string) => chainId,
  ({ data }, chainId) => {
    return data?.stats?.[chainId]?.total_requests ?? 0;
  },
);
