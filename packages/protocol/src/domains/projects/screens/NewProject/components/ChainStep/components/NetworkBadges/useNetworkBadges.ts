import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { ProjectChain } from 'domains/projects/types';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { getChainsBadges } from './utils';

// eslint-disable-next-line max-lines-per-function
export const useNetworkBadges = (
  chain: ProjectChain,
  setSelectedChainsIds: Dispatch<SetStateAction<ChainID[]>>,
) => {
  const {
    beaconsMainnet = [],
    beaconsTestnet = [],
    devnets = [],
    id,
    mainnets = [],
    opnodesMainnet = [],
    opnodesTestnet = [],
    testnets = [],
  } = chain;

  const {
    selectedBeaconMainnetIds,
    selectedBeaconTestnetIds,
    selectedDevnetIds,
    selectedMainnetIds,
    selectedOpnodeMainnetIds,
    selectedOpnodeTestnetIds,
    selectedTestnetIds,
  } = useProjectFormValues();

  const currentChainMainnetChainsBadges = useMemo(() => {
    if (isTestnetOnlyChain(id)) {
      if (selectedMainnetIds.includes(id)) {
        return [{ ...chain, isSelected: false }];
      }
    }

    return getChainsBadges(mainnets, selectedMainnetIds);
  }, [id, mainnets, selectedMainnetIds, chain]);
  const currentChainSelectedMainnetChainsBadges = useMemo(
    () =>
      currentChainMainnetChainsBadges.filter(
        chainBadge => chainBadge.isSelected,
      ),
    [currentChainMainnetChainsBadges],
  );

  const currentChainTestnetChainsBadges = useMemo(() => {
    if (isTestnetOnlyChain(id)) {
      if (selectedTestnetIds.includes(id)) {
        return [{ ...chain, isSelected: false }];
      }
    }

    return getChainsBadges(testnets, selectedTestnetIds);
  }, [id, testnets, selectedTestnetIds, chain]);
  const currentChainSelectedTestnetChainsBadges = useMemo(
    () =>
      currentChainTestnetChainsBadges.filter(
        chainBadge => chainBadge.isSelected,
      ),
    [currentChainTestnetChainsBadges],
  );

  const currentChainDevnetChainsBadges = useMemo(
    () => getChainsBadges(devnets, selectedDevnetIds),
    [devnets, selectedDevnetIds],
  );
  const currentChainSelectedDevnetChainsBadges = useMemo(
    () =>
      currentChainDevnetChainsBadges.filter(
        chainBadge => chainBadge.isSelected,
      ),
    [currentChainDevnetChainsBadges],
  );

  const currentChainBeaconMainnetChainsBadges = useMemo(
    () => getChainsBadges(beaconsMainnet, selectedBeaconMainnetIds),
    [beaconsMainnet, selectedBeaconMainnetIds],
  );
  const currentChainSelectedBeaconMainnetChainsBadges = useMemo(
    () =>
      currentChainBeaconMainnetChainsBadges.filter(
        chainBadge => chainBadge.isSelected,
      ),
    [currentChainBeaconMainnetChainsBadges],
  );

  const currentChainBeaconTestnetChainsBadges = useMemo(
    () => getChainsBadges(beaconsTestnet, selectedBeaconTestnetIds),
    [beaconsTestnet, selectedBeaconTestnetIds],
  );
  const currentChainSelectedBeaconTestnetChainsBadges = useMemo(
    () =>
      currentChainBeaconTestnetChainsBadges.filter(
        chainBadge => chainBadge.isSelected,
      ),
    [currentChainBeaconTestnetChainsBadges],
  );

  const currentChainOpnodeMainnetChainsBadges = useMemo(
    () => getChainsBadges(opnodesMainnet, selectedOpnodeMainnetIds),
    [opnodesMainnet, selectedOpnodeMainnetIds],
  );
  const currentChainSelectedOpnodeMainnetChainsBadges = useMemo(
    () =>
      currentChainOpnodeMainnetChainsBadges.filter(
        chainBadge => chainBadge.isSelected,
      ),
    [currentChainOpnodeMainnetChainsBadges],
  );

  const currentChainOpnodeTestnetChainsBadges = useMemo(
    () => getChainsBadges(opnodesTestnet, selectedOpnodeTestnetIds),
    [opnodesTestnet, selectedOpnodeTestnetIds],
  );
  const currentChainSelectedOpnodeTestnetChainsBadges = useMemo(
    () =>
      currentChainOpnodeTestnetChainsBadges.filter(
        chainBadge => chainBadge.isSelected,
      ),
    [currentChainOpnodeTestnetChainsBadges],
  );

  const hasSelectedChains =
    currentChainSelectedMainnetChainsBadges.length > 0 ||
    currentChainSelectedTestnetChainsBadges.length > 0 ||
    currentChainSelectedDevnetChainsBadges.length > 0 ||
    currentChainSelectedBeaconMainnetChainsBadges.length > 0 ||
    currentChainSelectedBeaconTestnetChainsBadges.length > 0 ||
    currentChainSelectedOpnodeMainnetChainsBadges.length > 0 ||
    currentChainSelectedOpnodeTestnetChainsBadges.length > 0;

  const hasMultipleChains =
    currentChainMainnetChainsBadges
      .concat(currentChainTestnetChainsBadges)
      .concat(currentChainDevnetChainsBadges)
      .concat(currentChainBeaconMainnetChainsBadges)
      .concat(currentChainBeaconTestnetChainsBadges)
      .concat(currentChainOpnodeMainnetChainsBadges)
      .concat(currentChainOpnodeTestnetChainsBadges).length > 1;

  useEffect(() => {
    if (!hasSelectedChains) {
      setSelectedChainsIds((ids: ChainID[]) =>
        ids.filter(currentChainId => currentChainId !== id),
      );
    }
  }, [hasSelectedChains, id, setSelectedChainsIds]);

  return {
    currentChainMainnetChainsBadges,
    currentChainTestnetChainsBadges,
    currentChainDevnetChainsBadges,
    currentChainBeaconMainnetChainsBadges,
    currentChainBeaconTestnetChainsBadges,
    currentChainOpnodeMainnetChainsBadges,
    currentChainOpnodeTestnetChainsBadges,
    isEditButtonVisible: hasSelectedChains && hasMultipleChains,
  };
};
