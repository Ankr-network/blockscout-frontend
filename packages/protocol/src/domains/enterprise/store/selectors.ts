import { createSelector } from '@reduxjs/toolkit';
import { EnterpriseClientEndpoint } from 'multirpc-sdk/src/enterprise/types';

import { MultiService } from 'modules/api/MultiService';
import { selectBlockchains } from 'domains/chains/store/selectors';
import { formatChainsConfigToChains } from 'domains/chains/utils/formatChainsConfigToChains';
import { selectAddress } from 'domains/auth/store';
import { selectJwtTokenManager } from 'domains/jwtToken/store/selectors';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';

import { fetchIsEnterpriseClient } from '../actions/fetchIsEnterpriseClient';
import { fetchEnterpriseEndpoints } from '../actions/fetchEnterpriseEndpoints';
import { chainsFetchEnterpriseStats } from '../actions/fetchEnterpriseStats';
import { selectUserGroupConfigByAddress } from '../../userGroup/store';
import { getEnterpriseStats } from '../actions/utils';

export type EnterpriseClientJwtManagerItem = EnterpriseClientEndpoint &
  JwtManagerToken;

const mapEnterpriseApiKeysToJwtManagerTokens = (
  endpoint: EnterpriseClientEndpoint,
  index: number,
) => {
  return {
    index,
    name: endpoint.enterprise_api_key_name || '',
    description: '',
    jwtData: '',
    ...endpoint,
    userEndpointToken: endpoint.enterprise_api_key,
  };
};

const mapEnterpriseChainIds = ({
  blockchains,
}: EnterpriseClientEndpoint): string[] => {
  return (
    blockchains?.flatMap(({ blockchain }) => blockchain)?.filter(Boolean) || []
  );
};

export const selectEnterpriseStatus = createSelector(
  fetchIsEnterpriseClient.select({}),
  status => status,
);

const selectEnterpriseEndpoints = createSelector(
  fetchEnterpriseEndpoints.select({ params: {} }),
  data => data,
);

export const selectEnterpriseEndpointsError = createSelector<
  any, // should be typeof selectEnterpriseEndpoints, but it is readonly. so just declared any to describe the return type
  Error | undefined
>(selectEnterpriseEndpoints, ({ error }: { error?: Error }) => error);

export const selectEnterpriseApiKeysAsJwtManagerTokens = createSelector(
  selectEnterpriseEndpoints,
  ({ data: apiKeysArray = [], isLoading, isUninitialized }) => {
    const apiKeys: EnterpriseClientJwtManagerItem[] = apiKeysArray
      .map(mapEnterpriseApiKeysToJwtManagerTokens)
      .filter(({ blockchains }) => Boolean(blockchains));

    return {
      apiKeys,
      isLoading: isLoading || isUninitialized,
    };
  },
);

export const selectEnterpriseUserAddress = createSelector(
  selectUserGroupConfigByAddress,
  selectAddress,
  ({ selectedGroupAddress }, userAddress) =>
    selectedGroupAddress || userAddress,
);

const selectEnterpriseSelectedApiKey = createSelector(
  selectEnterpriseApiKeysAsJwtManagerTokens,
  selectJwtTokenManager,
  selectEnterpriseUserAddress,
  ({ apiKeys: enterpriseApiKeys }, jwtTokenManager, address) => {
    const currentIndex = jwtTokenManager[address]?.tokenIndex || 0;

    return enterpriseApiKeys.find(apiKey => apiKey.index === currentIndex);
  },
);

const selectAllAvailableEnterpriseChainIds = createSelector(
  fetchEnterpriseEndpoints.select({ params: {} }),
  ({ data: apiKeys = [] }) => {
    const allChains = apiKeys.flatMap(mapEnterpriseChainIds);

    return [...new Set(allChains)];
  },
);

const selectEnterpriseChainsForSelectedApiKey = createSelector(
  selectEnterpriseSelectedApiKey,
  selectedApiKey => {
    return (
      selectedApiKey?.blockchains?.flatMap(({ blockchain }) => blockchain) || []
    );
  },
);

export const selectEnterpriseUserEndpointToken = createSelector(
  selectEnterpriseSelectedApiKey,
  selectedApiKey => selectedApiKey?.userEndpointToken,
);

export const selectEnterpriseUserEndpointTokenIndex = createSelector(
  selectEnterpriseSelectedApiKey,
  selectedApiKey => selectedApiKey?.index,
);

export const selectEnterpriseBlockchainsDependingOnSelectedApiKey =
  createSelector(
    selectEnterpriseUserEndpointToken,
    selectAllAvailableEnterpriseChainIds,
    selectEnterpriseChainsForSelectedApiKey,
    (userEndpointToken, enterpriseChains, selectedTokenChains) => {
      return userEndpointToken ? selectedTokenChains : enterpriseChains;
    },
  );

export const selectEnterpriseChains = createSelector(
  selectBlockchains,
  selectEnterpriseBlockchainsDependingOnSelectedApiKey,
  selectEnterpriseUserEndpointToken,
  (
    { data: blockchains = [], isLoading },
    enterpriseChains,
    userEndpointToken,
  ) => {
    const publicService = MultiService.getService();

    const formattedChains = publicService.formatPrivateEndpoints(
      blockchains,
      userEndpointToken,
    );

    const chains = formatChainsConfigToChains(
      formattedChains,
      enterpriseChains,
    ).filter(chain => enterpriseChains.includes(chain.id));

    return { chains, isLoading };
  },
);

export const selectEnterpriseStats = createSelector(
  chainsFetchEnterpriseStats.select(undefined as any), // ignore params
  state => {
    return {
      ...state,
      data: state.data ? getEnterpriseStats(state.data) : undefined,
    };
  },
);
