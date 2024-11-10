import { createSelector, lruMemoize, weakMapMemoize } from 'reselect';
import {
  formatChainsConfigToChains,
  ChainID,
  ChainPath,
} from '@ankr.com/chains-list';

import { MultiService } from 'modules/api/MultiService';
import { RootState } from 'store';
import { chainsFetchBlockchains } from 'modules/chains/actions/fetchBlockchains';
import { chainsFetchChainNodesDetail } from 'modules/chains/actions/fetchChainNodesDetail';
import { deepEqulityCheck } from 'modules/common/utils/deepEqualityCheck';
import { getAddIsArchiveCB } from 'modules/chains/utils/isArchive';
import { getUniqueArray } from 'modules/common/utils/getUniqueArray';

import { clearPathPrefix } from '../utils/clearPathPrefix';
import { filterPathsExceptions } from '../utils/filterPathsExceptions';
import { getAllPathsByChain } from '../utils/getAllPathsByChain';
import { getPathsFromChains } from '../utils/getPathsFromChains';
import { getSubchainIds } from '../utils/getSubchainIds';
import { getSubchainIdsWithNotEmptyPath } from '../utils/getSubchainIdsWithNotEmptyPath';

export const selectBlockchains = chainsFetchBlockchains.select();

export const selectNodesDetails = chainsFetchChainNodesDetail.select();

export const selectBlockchainsData = createSelector(
  selectBlockchains,
  ({ data = [] }) => data,
);

export const selectNodesDetailsData = createSelector(
  selectNodesDetails,
  ({ data: nodes = [] }) => nodes,
);

export const selectBlockchainsLoadingStatus = createSelector(
  selectBlockchains,
  ({ isLoading, isUninitialized }) => isLoading || isUninitialized,
);

export const selectNodesDetailsLoadingStatus = createSelector(
  selectNodesDetails,
  ({ isLoading }) => isLoading,
);

export const selectPublicBlockchains = createSelector(
  selectBlockchainsData,
  selectNodesDetailsData,
  (blockchains, nodes) => {
    const addIsArchive = getAddIsArchiveCB(nodes);

    const publicChains =
      MultiService.getService().formatPublicEndpoints(blockchains);

    return formatChainsConfigToChains(publicChains).map(addIsArchive);
  },
);

export const selectConfiguredBlockchainsForToken = createSelector(
  selectBlockchainsData,
  selectNodesDetailsData,
  (_state: RootState, userEndpointToken?: string) => userEndpointToken,
  (blockchains, nodes, userEndpointToken) => {
    const addIsArchive = getAddIsArchiveCB(nodes);

    const privateChains = MultiService.getService().formatPrivateEndpoints(
      blockchains,
      userEndpointToken,
    );

    return formatChainsConfigToChains(privateChains).map(addIsArchive);
  },
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectBlockchainBySubchainId = createSelector(
  selectPublicBlockchains,
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
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectBlockchainsBySubchainIds = createSelector(
  (state: RootState, chainIds: ChainID[]) => ({
    state,
    chainIds,
  }),
  ({ chainIds, state }) => {
    const rootChains = chainIds.map(chainId =>
      selectBlockchainBySubchainId(state, chainId),
    );

    // filter out repeated chains
    return rootChains.filter(
      (chain, index, self) =>
        chain && self.findIndex(item => item?.id === chain?.id) === index,
    );
  },
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectPublicChainById = createSelector(
  (state: RootState, chainId: ChainID) => ({
    state,
    chainId,
  }),
  selectPublicBlockchains,
  ({ chainId, state }, blockchains) => {
    const mainChain = selectBlockchainBySubchainId(state, chainId);

    return blockchains?.find(chain => chain?.id === mainChain?.id);
  },
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
    memoizeOptions: { resultEqualityCheck: deepEqulityCheck },
  },
);

export const selectPrivateChainById = createSelector(
  (state: RootState, chainId: ChainID, userEndpointToken?: string) => ({
    state,
    chainId,
    userEndpointToken,
  }),
  ({ chainId, state, userEndpointToken }) => {
    const blockchains = selectConfiguredBlockchainsForToken(
      state,
      userEndpointToken,
    );
    const mainChain = selectBlockchainBySubchainId(state, chainId);

    return blockchains?.find(chain => chain?.id === mainChain?.id);
  },
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
    memoizeOptions: { resultEqualityCheck: deepEqulityCheck },
  },
);

export const selectSubChainIdsByChainId = createSelector(
  selectPublicBlockchains,
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
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectAllSubChainIdsWithPathByChainId = createSelector(
  selectPublicBlockchains,
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
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectAllChainsPaths = createSelector(
  selectBlockchainsData,
  blockchains => getPathsFromChains(blockchains),
);

export const selectAllPathsByChainId = createSelector(
  selectPublicBlockchains,
  (_state: RootState, chainId?: ChainID) => chainId,
  selectAllChainsPaths,
  (blockchains, chainId, allChainsPaths = []) => {
    const currentChain = blockchains?.find(
      blockchain => blockchain.id === chainId,
    );

    if (currentChain) {
      return getAllPathsByChain(currentChain).filter(Boolean);
    }

    if (chainId === ChainID.ALL_CHAINS) {
      return allChainsPaths;
    }

    return [];
  },
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectAllPathsExceptSubchainsForChainId = createSelector(
  (state: RootState, chainId: ChainID) => ({
    state,
    chainId,
  }),
  selectAllChainsPaths,
  ({ chainId, state }, allChainsPaths) => {
    const currentChainPaths = selectAllPathsByChainId(state, chainId);

    return allChainsPaths.filter(path => !currentChainPaths.includes(path));
  },
  {
    argsMemoize: weakMapMemoize,
    memoize: lruMemoize,
    memoizeOptions: {
      maxSize: 100,
      resultEqualityCheck: deepEqulityCheck,
    },
  },
);

export const selectAllChainsIds = createSelector(
  selectBlockchainsData,
  blockchains => {
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
  selectBlockchainsData,
  (_state: RootState, path: string) => path,
  (blockchains, path) => {
    const chain = blockchains?.find(blockchain =>
      blockchain.paths
        ?.map(blockchainPath => clearPathPrefix(blockchainPath))
        .includes(path),
    );

    return chain?.id;
  },
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectChainById = createSelector(
  selectPublicBlockchains,
  (_state: RootState, chainId: ChainID) => chainId,
  (blockchains, chainId) => {
    return blockchains?.find(
      blockchain =>
        blockchain.id === chainId || blockchain.paths?.includes(chainId),
    );
  },
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectChainIdsByPaths = createSelector(
  (_state: RootState, selectedChainPaths: ChainPath[]) => selectedChainPaths,
  selectBlockchainsData,
  (selectedChainPaths, blockchains) => {
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
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectChainPathsByIds = createSelector(
  (_state: RootState, selectedChainIds: ChainID[]) => selectedChainIds,
  selectBlockchainsData,
  (selectedChainIds, blockchains) => {
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
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);

export const selectSubchainBySubchainId = createSelector(
  (_state: RootState, chainId: ChainID) => chainId,
  selectBlockchainsData,
  (chainId, blockchains) => {
    return blockchains.find(
      blockchain =>
        blockchain.id === chainId || blockchain.paths?.includes(chainId),
    );
  },
  {
    argsMemoize: weakMapMemoize,
    memoize: weakMapMemoize,
  },
);
