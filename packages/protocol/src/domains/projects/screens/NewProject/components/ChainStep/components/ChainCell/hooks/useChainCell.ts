import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { ProjectChain } from 'domains/projects/types';
import { isExtensionOnlyChain } from 'domains/chains/utils/isExtensionOnlyChain';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';
import { getSubchainIds } from 'modules/chains/utils/getSubchainIds';
import { EXCEPTION_CHAIN_MAINNET_IDS_LIST } from 'modules/chains/constants';

import {
  ITypeSelectorProps,
  useAllChainsSelection,
} from '../../../hooks/useAllChainsSelection';
import { chainIdMapper } from '../../../utils/chainIdMapper';

export interface UseChainCellParams {
  chain: ProjectChain;
  allChains: ProjectChain[];
  selectedProjectChainsIds: ChainID[];
  setSelectedChainsIds: Dispatch<SetStateAction<ChainID[]>>;
}

// eslint-disable-next-line max-lines-per-function
export const useChainCell = ({
  allChains,
  chain,
  selectedProjectChainsIds,
  setSelectedChainsIds,
}: UseChainCellParams) => {
  const { id } = chain;

  const isAllChainsSelector = id === ChainID.ALL_CHAINS;

  const allChainsMainIds = useMemo(
    () =>
      allChains.flatMap(chainItem => {
        if (EXCEPTION_CHAIN_MAINNET_IDS_LIST.includes(chainItem.id)) {
          return chainItem.id;
        }

        return chainItem.mainnets?.flatMap(chainIdMapper);
      }) as ChainID[],
    [allChains],
  );

  const isChainWithoutMainnet =
    isTestnetOnlyChain(id) || isExtensionOnlyChain(id);

  const allChainsIds: ITypeSelectorProps = useMemo(() => {
    const allAvailableMainnetIds = allChains
      .filter(({ mainnets = [] }) => mainnets?.length)
      .flatMap(chainItem =>
        chainItem.mainnets?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableTestnetIds = allChains
      .filter(({ testnets = [] }) => testnets?.length)
      .flatMap(chainItem =>
        chainItem.testnets?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableDevnetIds = allChains
      .filter(({ devnets = [] }) => devnets?.length)
      .flatMap(chainItem =>
        chainItem.devnets?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableBeaconMainnetIds = allChains
      .filter(({ beaconsMainnet = [] }) => beaconsMainnet?.length)
      .flatMap(chainItem =>
        chainItem.beaconsMainnet?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableBeaconTestnetIds = allChains
      .filter(({ beaconsTestnet = [] }) => beaconsTestnet?.length)
      .flatMap(chainItem =>
        chainItem.beaconsTestnet?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableOpnodeMainnetIds = allChains
      .filter(({ opnodesMainnet = [] }) => opnodesMainnet?.length)
      .flatMap(chainItem =>
        chainItem.opnodesMainnet?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableOpnodeTestnetIds = allChains
      .filter(({ opnodesTestnet = [] }) => opnodesTestnet?.length)
      .flatMap(chainItem =>
        chainItem.opnodesTestnet?.flatMap(chainIdMapper),
      ) as ChainID[];

    return {
      allAvailableMainnetIds,
      allAvailableTestnetIds,
      allAvailableDevnetIds,
      allAvailableBeaconMainnetIds,
      allAvailableBeaconTestnetIds,
      allAvailableOpnodeMainnetIds,
      allAvailableOpnodeTestnetIds,
    };
  }, [allChains]);

  const areAllChainsSelected = useMemo(() => {
    return allChains.every(chainItem => {
      const all = getSubchainIds(chainItem);

      return all.some(chainId => selectedProjectChainsIds.includes(chainId));
    });
  }, [allChains, selectedProjectChainsIds]);

  const singleChainIds = useMemo(
    () => ({
      allAvailableMainnetIds: chain.mainnets?.map(chainIdMapper) || [],
      allAvailableTestnetIds: chain.testnets?.map(chainIdMapper) || [],
      allAvailableDevnetIds: chain.devnets?.map(chainIdMapper) || [],
      allAvailableBeaconMainnetIds:
        chain.beaconsMainnet?.map(chainIdMapper) || [],
      allAvailableBeaconTestnetIds:
        chain.beaconsTestnet?.map(chainIdMapper) || [],
      allAvailableOpnodeMainnetIds:
        chain.opnodesMainnet?.map(chainIdMapper) || [],
      allAvailableOpnodeTestnetIds:
        chain.opnodesTestnet?.map(chainIdMapper) || [],
    }),
    [chain],
  );

  const chainIdsParams = useMemo(() => {
    if (isAllChainsSelector) {
      return allChainsIds;
    }

    return singleChainIds;
  }, [isAllChainsSelector, allChainsIds, singleChainIds]);

  const { handleSelectAll, handleUnselectAll } =
    useAllChainsSelection(chainIdsParams);

  const isCurrentChainActive = useMemo(
    () => selectedProjectChainsIds.includes(id),
    [id, selectedProjectChainsIds],
  );

  const handleSelectChains = useCallback(() => {
    const chainIds = (chain?.mainnets || [])
      .concat(chain?.testnets || [])
      .concat(chain?.devnets || [])
      .concat(chain?.beaconsMainnet || [])
      .concat(chain?.beaconsTestnet || [])
      .concat(chain?.opnodesMainnet || [])
      .concat(chain?.opnodesTestnet || [])
      .map(chainIdMapper);

    if (isChainWithoutMainnet) {
      chainIds.push(id);
    }

    const setOfChainIds = new Set(
      isAllChainsSelector ? allChainsMainIds : chainIds,
    );

    if (isAllChainsSelector) {
      if (areAllChainsSelected) {
        handleUnselectAll();
        setSelectedChainsIds([]);
      } else {
        handleSelectAll();
        setSelectedChainsIds(allChainsMainIds);
      }
    } else if (isCurrentChainActive) {
      handleUnselectAll();
      setSelectedChainsIds((ids: ChainID[]) =>
        ids.filter(currentChainId => !setOfChainIds.has(currentChainId)),
      );
    } else {
      handleSelectAll();
      setSelectedChainsIds((ids: ChainID[]) => ids.concat(chainIds));
    }
  }, [
    chain,
    handleSelectAll,
    handleUnselectAll,
    isCurrentChainActive,
    setSelectedChainsIds,
    isChainWithoutMainnet,
    id,
    areAllChainsSelected,
    isAllChainsSelector,
    allChainsMainIds,
  ]);

  return { handleSelectChains, areAllChainsSelected };
};
