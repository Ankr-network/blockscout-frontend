import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { ChainID } from 'domains/chains/types';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { getCurrentChainSelectedExtensions, getSelectedChains } from './utils';
import { ProjectChain } from '../../../hooks/useProjectChains';
import { isChainHasSingleOptionToSelect } from '../../../utils/isChainHasSingleOptionToSelect';
import { NewProjectFormValues } from '../../NewProjectForm/NewProjectFormTypes';

// eslint-disable-next-line max-lines-per-function
export const useNetworkBadges = (
  chain: ProjectChain,
  setSelectedChainsIds: Dispatch<SetStateAction<ChainID[]>>,
) => {
  const {
    id,
    testnets = [],
    devnets = [],
    beaconsMainnet = [],
    beaconsTestnet = [],
    opnodesMainnet = [],
    opnodesTestnet = [],
    extensions = [],
    extenders = [],
  } = chain;

  const {
    selectedMainnetIds,
    selectedTestnetIds,
    selectedDevnetIds,
    selectedBeaconMainnetIds,
    selectedBeaconTestnetIds,
    selectedOpnodeMainnetIds,
    selectedOpnodeTestnetIds,
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

  const currentChainSelectedBeaconMainnetChains = useMemo(
    () => getSelectedChains(beaconsMainnet, selectedBeaconMainnetIds),
    [beaconsMainnet, selectedBeaconMainnetIds],
  );

  const currentChainSelectedBeaconTestnetChains = useMemo(
    () => getSelectedChains(beaconsTestnet, selectedBeaconTestnetIds),
    [beaconsTestnet, selectedBeaconTestnetIds],
  );

  const currentChainSelectedOpnodeMainnetChains = useMemo(
    () => getSelectedChains(opnodesMainnet, selectedOpnodeMainnetIds),
    [opnodesMainnet, selectedOpnodeMainnetIds],
  );

  const currentChainSelectedOpnodeTestnetChains = useMemo(
    () => getSelectedChains(opnodesTestnet, selectedOpnodeTestnetIds),
    [opnodesTestnet, selectedOpnodeTestnetIds],
  );

  const hasSelectedChains =
    isCurrentChainMainnetSelected ||
    currentChainSelectedExtensions.length > 0 ||
    currentChainSelectedTestnetChains.length > 0 ||
    currentChainSelectedDevnetChains.length > 0 ||
    currentChainSelectedBeaconMainnetChains.length > 0 ||
    currentChainSelectedBeaconTestnetChains.length > 0 ||
    currentChainSelectedOpnodeMainnetChains.length > 0 ||
    currentChainSelectedOpnodeTestnetChains.length > 0;

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

  const hasOnlyOneMainnetToSelect =
    !testnets?.length && !devnets?.length && !extensions.length;

  const hasOnlyOneTestnetToSelect =
    isTestnetOnlyChain(chain.id) && testnets?.length === 1 && !devnets?.length;

  const isIconInfoVisible =
    (hasOnlyOneMainnetToSelect && isCurrentChainMainnetSelected) ||
    (hasOnlyOneTestnetToSelect &&
      currentChainSelectedTestnetChains.length === 1) ||
    (isChainHasSingleOptionToSelect(chain.id) && isCurrentChainMainnetSelected);

  const isEditButtonVisible =
    !hasOnlyOneMainnetToSelect &&
    !hasOnlyOneTestnetToSelect &&
    hasSelectedChains &&
    !isChainHasSingleOptionToSelect(chain.id);

  return {
    isCurrentChainMainnetSelected,
    currentChainSelectedExtensions,
    currentChainSelectedTestnetChains,
    currentChainSelectedDevnetChains,
    currentChainSelectedBeaconMainnetChains,
    currentChainSelectedBeaconTestnetChains,
    currentChainSelectedOpnodeMainnetChains,
    currentChainSelectedOpnodeTestnetChains,
    handleRemove,
    isIconInfoVisible,
    isEditButtonVisible,
  };
};
