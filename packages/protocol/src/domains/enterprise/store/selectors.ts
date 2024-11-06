import { createSelector } from '@reduxjs/toolkit';
import { EnterpriseClientEndpoint } from 'multirpc-sdk/src/enterprise/types';
import {
  formatChainsConfigToChains,
  ChainSubType,
  ZETACHAIN_ATHENS3_CHAINS,
} from '@ankr.com/chains-list';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { MultiService } from 'modules/api/MultiService';
import { selectAddress } from 'domains/auth/store';
import { selectBlockchains } from 'modules/chains/store/selectors';
import { selectJwtTokenManager } from 'domains/jwtToken/store/selectors';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';

import { fetchEnterpriseEndpoints } from '../actions/fetchEnterpriseEndpoints';
import { filterBlockchains } from './utils/filterBlockchains';

export type EnterpriseClientJWT = EnterpriseClientEndpoint & JWT;

const mapEnterpriseApiKeysToJWT = (
  endpoint: EnterpriseClientEndpoint,
  index: number,
): EnterpriseClientJWT => {
  return {
    index,
    id: endpoint.api_key_id,
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

export const selectEnterpriseEndpoints = createSelector(
  fetchEnterpriseEndpoints.select(undefined as unknown as never),
  data => data,
);

export const selectEnterpriseEndpointsLoading = createSelector(
  selectEnterpriseEndpoints,
  ({ isLoading }) => isLoading,
);

export const selectEnterpriseEndpointsError = createSelector(
  selectEnterpriseEndpoints,
  ({ error }) => error as Error | undefined,
);

export const selectEnterpriseApiKeysAsJWTs = createSelector(
  selectEnterpriseEndpoints,
  ({ data: apiKeysArray = [], isLoading, isUninitialized }) => {
    const apiKeys: EnterpriseClientJWT[] = apiKeysArray
      .map(mapEnterpriseApiKeysToJWT)
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

export const selectEnterpriseSelectedApiKey = createSelector(
  selectEnterpriseApiKeysAsJWTs,
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

export const selectEnterpriseChainsForSelectedApiKey = createSelector(
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
    const filteredBlockchains = filterBlockchains(
      blockchains,
      enterpriseChains,
    );

    const publicService = MultiService.getService();

    const formattedChains = publicService.formatPrivateEndpoints(
      filteredBlockchains,
      userEndpointToken,
    );

    const chains = formatChainsConfigToChains(
      formattedChains,
      enterpriseChains,
    );

    return { chains, isLoading };
  },
);

export const selectAvailableSubTypes = createSelector(
  selectEnterpriseBlockchainsDependingOnSelectedApiKey,
  enterpriseChains => {
    const availableSubtypes = [];

    const isAthens3Available = ZETACHAIN_ATHENS3_CHAINS.some(id =>
      enterpriseChains.includes(id),
    );

    if (isAthens3Available) {
      availableSubtypes.push(ChainSubType.Athens3);
    }

    return availableSubtypes;
  },
);
