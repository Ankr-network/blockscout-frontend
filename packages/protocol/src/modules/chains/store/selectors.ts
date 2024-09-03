import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { chainsFetchBlockchains } from 'modules/chains/actions/fetchBlockchains';
import { ChainID, ChainPath } from 'modules/chains/types';
import { formatChainsConfigToChains } from 'domains/chains/utils/formatChainsConfigToChains';
import { chainsFetchChainNodesDetail } from 'modules/chains/actions/fetchChainNodesDetail';
import { getAddIsArchiveCB } from 'modules/chains/utils/isArchive';
import { getUniqueArray } from 'modules/common/utils/getUniqueArray';

import { getSubchainIds } from '../utils/getSubchainIds';
import { getAllPathsByChain } from '../utils/getAllPathsByChain';
import { getSubchainIdsWithNotEmptyPath } from '../utils/getSubchainIdsWithNotEmptyPath';
import { clearPathPrefix } from '../utils/clearPathPrefix';
import { filterPathsExceptions } from '../utils/filterPathsExceptions';

export const selectBlockchains = createSelector(
  chainsFetchBlockchains.select(),
  blockchains => blockchains,
);

export const selectBlockchainsData = createSelector(
  selectBlockchains,
  ({ data }) => data,
);

export const selectBlockchainsLoadingStatus = createSelector(
  chainsFetchBlockchains.select(),
  ({ isLoading }) => isLoading,
);

export const selectNodesDetails = createSelector(
  chainsFetchChainNodesDetail.select(),
  nodes => nodes,
);

export const selectNodesDetailsLoadingStatus = createSelector(
  chainsFetchChainNodesDetail.select(),
  ({ isLoading }) => isLoading,
);

export const selectConfiguredBlockchains = createSelector(
  selectBlockchains,
  selectNodesDetails,
  ({ data: blockchains = [] }, { data: nodes }) => {
    const addIsArchive = getAddIsArchiveCB(nodes);

    const publicChains = MultiService.getService().formatPrivateEndpoints(
      blockchains,
      '',
    );

    return formatChainsConfigToChains(publicChains).map(addIsArchive);
  },
);

export const selectConfiguredBlockchainsForToken = createSelector(
  selectBlockchains,
  selectNodesDetails,
  (_state: RootState, userEndpointToken?: string) => userEndpointToken,
  ({ data: blockchains = [] }, { data: nodes }, userEndpointToken) => {
    const addIsArchive = getAddIsArchiveCB(nodes);

    const privateChains = MultiService.getService().formatPrivateEndpoints(
      blockchains,
      userEndpointToken,
    );

    return formatChainsConfigToChains(privateChains).map(addIsArchive);
  },
);

export const selectBlockchainBySubchainId = createSelector(
  selectConfiguredBlockchains,
  (_state: RootState, chainId: ChainID) => chainId,
  (blockchains, chainId) => {
    const blockchainFoundByMainId = blockchains?.find(
      blockchain => blockchain.id === chainId,
    );

    if (blockchainFoundByMainId) {
      return blockchainFoundByMainId;
    }

    const blockchainFoundBySubchainId = blockchains?.find(chain => {
      if (chain.id === chainId) {
        return true;
      }

      return getSubchainIds(chain).includes(chainId);
    });

    return blockchainFoundBySubchainId;
  },
);

export const selectPublicChainById = createSelector(
  (state: RootState, chainId: ChainID) => ({
    state,
    chainId,
  }),
  selectConfiguredBlockchains,
  ({ chainId, state }, blockchains) => {
    const mainChain = selectBlockchainBySubchainId(state, chainId);

    return blockchains?.find(chain => chain?.id === mainChain?.id);
  },
);

export const selectSubChainIdsByChainId = createSelector(
  selectConfiguredBlockchains,
  (_state: RootState, chainId: ChainID) => chainId,
  (blockchains, chainId) => {
    const currentChain = blockchains?.find(
      blockchain => blockchain.id === chainId,
    );

    if (currentChain) {
      return getSubchainIds(currentChain);
    }

    return [chainId];
  },
);

export const selectAllSubChainIdsWithPathByChainId = createSelector(
  selectConfiguredBlockchains,
  (_state: RootState, chainId: ChainID) => chainId,
  (blockchains, chainId) => {
    const currentChain = blockchains?.find(
      blockchain => blockchain.id === chainId,
    );

    if (currentChain) {
      return getSubchainIdsWithNotEmptyPath(currentChain);
    }

    return [chainId];
  },
);

export const selectAllChainsPaths = createSelector(
  selectBlockchains,
  ({ data: blockchains }) => {
    const allChainPaths = blockchains
      ?.flatMap(blockchain => {
        const chainPaths = blockchain?.paths?.filter(Boolean);

        if (!chainPaths) {
          return [];
        }

        const chainPathsProcessed = chainPaths
          .flatMap(clearPathPrefix)
          .filter(item => item.length !== 0);

        return chainPathsProcessed;
      })
      .filter(Boolean);

    if (!allChainPaths) return [];

    return getUniqueArray([...allChainPaths]);
  },
);

export const selectAllPathsByChainId = createSelector(
  selectConfiguredBlockchains,
  (_state: RootState, chainId: ChainID) => chainId,
  selectAllChainsPaths,
  (blockchains, chainId, allChainsPaths = []) => {
    const currentChain = blockchains?.find(
      blockchain => blockchain.id === chainId,
    );

    if (currentChain) {
      return getAllPathsByChain(currentChain);
    }

    if (chainId === ChainID.ALL_CHAINS) {
      return allChainsPaths;
    }

    return [];
  },
);

export const selectAllChainsIds = createSelector(
  selectBlockchains,
  ({ data: blockchains }) => {
    const allChainIds: ChainID[] =
      blockchains?.flatMap(blockchain => {
        const hasPaths = blockchain?.paths?.length !== 0;

        if (!hasPaths) {
          return [];
        }

        const chainIdsProcessed = blockchain.id as ChainID;

        return chainIdsProcessed;
      }) || [];

    if (!allChainIds) return [];

    return getUniqueArray([...allChainIds]);
  },
);

export const selectSubChainIdByPath = createSelector(
  selectBlockchains,
  (_state: RootState, path: string) => path,
  ({ data: blockchains }, path) => {
    const chain = blockchains?.find(blockchain =>
      blockchain.paths
        ?.map(blockchainPath => clearPathPrefix(blockchainPath))
        .includes(path),
    );

    return chain?.id;
  },
);

export const selectChainById = createSelector(
  selectConfiguredBlockchains,
  (_state: RootState, chainId: ChainID) => chainId,
  (blockchains, chainId) => {
    return blockchains?.find(
      blockchain =>
        blockchain.id === chainId || blockchain.paths?.includes(chainId),
    );
  },
);

export const selectChainIdsByPaths = createSelector(
  (_state: RootState, selectedChainPaths: ChainPath[]) => selectedChainPaths,
  selectBlockchains,
  (selectedChainPaths, { data: blockchains = [] }) => {
    const chainIds = selectedChainPaths.map(selectedChainPath => {
      const chain = blockchains?.find(blockchain =>
        blockchain.paths?.some(
          blockchainPath =>
            clearPathPrefix(blockchainPath) === selectedChainPath,
        ),
      );

      return chain?.id;
    });

    return getUniqueArray(chainIds.filter(Boolean) as ChainID[]);
  },
);

export const selectChainPathsByIds = createSelector(
  (_state: RootState, selectedChainIds: ChainID[]) => selectedChainIds,
  selectBlockchains,
  (selectedChainIds, { data: blockchains = [] }) => {
    const chainPaths = selectedChainIds.map(selectedChainId => {
      const chain = blockchains?.find(
        blockchain => blockchain.id === selectedChainId,
      );

      if (!chain || chain?.paths?.length === 0) return selectedChainId;

      const chainPath = chain!.paths![0];

      return clearPathPrefix(chainPath);
    });

    return getUniqueArray(chainPaths.filter(Boolean)).filter(
      filterPathsExceptions,
    );
  },
);

export const selectSubchainBySubchainId = createSelector(
  (_state: RootState, chainId: ChainID) => chainId,
  selectBlockchains,
  (chainId, { data: blockchains = [] }) => {
    return blockchains.find(
      blockchain =>
        blockchain.id === chainId || blockchain.paths?.includes(chainId),
    );
  },
);
