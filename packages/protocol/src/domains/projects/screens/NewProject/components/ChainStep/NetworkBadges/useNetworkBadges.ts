import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { Chain, ChainID } from 'domains/chains/types';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

import { useProjectFormValues } from '../../../hooks/useProjectFormValues';

const getSelectedChains = (chains: Chain[], selectedIds: ChainID[]) =>
  chains.filter(chain => selectedIds.includes(chain.id));

export const useNetworkBadges = (
  chain: Chain,
  setSelectedChainsIds: Dispatch<SetStateAction<ChainID[]>>,
) => {
  const { id, testnets = [], devnets = [], extensions = [] } = chain;

  const {
    selectedMainnetIds,
    selectedTestnetIds,
    selectedDevnetIds,
    onChange,
  } = useProjectFormValues();

  const currentChainSelectedExtensions = useMemo(
    () => getSelectedChains(extensions, selectedMainnetIds),
    [extensions, selectedMainnetIds],
  );

  const isCurrentChainMainnetSelected: boolean = useMemo(
    () => selectedMainnetIds.includes(id),
    [id, selectedMainnetIds],
  );

  const currentChainSelectedTestnetChains = useMemo(() => {
    if (isTestnetOnlyChain(id)) {
      if (selectedTestnetIds.includes(id)) {
        return [chain];
      }
    }

    return getSelectedChains(testnets, selectedTestnetIds);
  }, [id, testnets, selectedTestnetIds, chain]);

  const currentChainSelectedDevnetChains = useMemo(
    () => getSelectedChains(devnets, selectedDevnetIds),
    [devnets, selectedDevnetIds],
  );

  const hasSelectedChains =
    isCurrentChainMainnetSelected ||
    currentChainSelectedExtensions.length > 0 ||
    currentChainSelectedTestnetChains.length > 0 ||
    currentChainSelectedDevnetChains.length > 0;

  const handleRemove = useCallback(
    (chainId: ChainID, fieldName: string, currentFieldValues: string[]) => {
      onChange(
        fieldName,
        currentFieldValues.filter(currentId => currentId !== chainId),
      );
    },
    [onChange],
  );

  useEffect(() => {
    if (!hasSelectedChains) {
      setSelectedChainsIds((ids: ChainID[]) =>
        ids.filter(currentChainId => currentChainId !== id),
      );
    }
  }, [hasSelectedChains, id, setSelectedChainsIds]);

  return {
    isCurrentChainMainnetSelected,
    currentChainSelectedExtensions,
    currentChainSelectedTestnetChains,
    currentChainSelectedDevnetChains,
    hasSelectedChains,
    handleRemove,
    selectedMainnetIds,
    selectedTestnetIds,
    selectedDevnetIds,
  };
};
