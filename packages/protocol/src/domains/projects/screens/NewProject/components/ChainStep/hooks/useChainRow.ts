import { Dispatch, SetStateAction, useCallback } from 'react';

import { ChainID } from 'domains/chains/types';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';
import { isExtensionOnlyChain } from 'domains/chains/utils/isExtensionOnlyChain';

import { ProjectChain } from '../../../hooks/useProjectChains';
import { useAllChainsSelection } from './useAllChainsSelection';

export interface ChainRowParams {
  chain: ProjectChain;
  selectedProjectChainsIds: ChainID[];
  setSelectedChainsIds: Dispatch<SetStateAction<ChainID[]>>;
}

export const useChainRow = ({
  chain,
  selectedProjectChainsIds,
  setSelectedChainsIds,
}: ChainRowParams) => {
  const { id } = chain;
  const isCurrentChainActive = selectedProjectChainsIds.includes(id);
  const isChainWithoutMainnet =
    isTestnetOnlyChain(id) || isExtensionOnlyChain(id);

  const { handleSelectAll, handleUnselectAll } = useAllChainsSelection({
    allAvailableMainnetIds: chain.mainnets?.map(x => x.id) ?? [],
    allAvailableTestnetIds: chain.testnets?.map(x => x.id) ?? [],
    allAvailableDevnetIds: chain.devnets?.map(x => x.id) ?? [],
    allAvailableBeaconMainnetIds: chain.beaconsMainnet?.map(x => x.id) ?? [],
    allAvailableBeaconTestnetIds: chain.beaconsTestnet?.map(x => x.id) ?? [],
    allAvailableOpnodeMainnetIds: chain.opnodesMainnet?.map(x => x.id) ?? [],
    allAvailableOpnodeTestnetIds: chain.opnodesTestnet?.map(x => x.id) ?? [],
  });

  const handleSelectChains = useCallback(() => {
    const chainIds = (chain?.mainnets ?? [])
      .concat(chain?.testnets ?? [])
      .concat(chain?.devnets ?? [])
      .concat(chain?.beaconsMainnet ?? [])
      .concat(chain?.beaconsTestnet ?? [])
      .concat(chain?.opnodesMainnet ?? [])
      .concat(chain?.opnodesTestnet ?? [])
      .map(_chain => _chain.id);

    if (isChainWithoutMainnet) {
      chainIds.push(id);
    }

    const setOfChainIds = new Set(chainIds);

    if (isCurrentChainActive) {
      handleUnselectAll();
      setSelectedChainsIds((ids: ChainID[]) =>
        ids.filter(currentChainId => !setOfChainIds.has(currentChainId)),
      );
    } else {
      handleSelectAll();
      setSelectedChainsIds((ids: ChainID[]) => ids.concat(chainIds));
    }
  }, [
    chain?.beaconsMainnet,
    chain?.beaconsTestnet,
    chain?.devnets,
    chain?.mainnets,
    chain?.opnodesMainnet,
    chain?.opnodesTestnet,
    chain?.testnets,
    handleSelectAll,
    handleUnselectAll,
    isCurrentChainActive,
    setSelectedChainsIds,
    isChainWithoutMainnet,
    id,
  ]);

  return {
    isCurrentChainActive,
    handleSelectChains,
  };
};
