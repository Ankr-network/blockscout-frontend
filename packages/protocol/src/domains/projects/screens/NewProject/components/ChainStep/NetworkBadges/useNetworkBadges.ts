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
import { getCurrentChainSelectedExtensions, getSelectedChains } from './utils';
import { NewProjectFormValues } from '../../NewProjectForm/NewProjectFormTypes';

export const useNetworkBadges = (
  chain: Chain,
  setSelectedChainsIds: Dispatch<SetStateAction<ChainID[]>>,
) => {
  const {
    id,
    testnets = [],
    devnets = [],
    extensions = [],
    extenders = [],
  } = chain;

  const {
    selectedMainnetIds,
    selectedTestnetIds,
    selectedDevnetIds,
    onChange,
  } = useProjectFormValues();

  const currentChainSelectedExtensions = useMemo(
    () =>
      getCurrentChainSelectedExtensions({
        chainId: chain.id,
        subChains: [...extensions, ...extenders], // we need to add extenders for ChainID.SECRET and ChainID.NERVOS
        selectedMainnetIds,
      }),
    [chain.id, extenders, extensions, selectedMainnetIds],
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
    (
      chainId: ChainID,
      fieldName: keyof NewProjectFormValues,
      currentFieldValues: string[],
    ) => {
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
