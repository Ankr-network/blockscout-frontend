import { useCallback, useEffect, useState } from 'react';
import { Chain, ChainID } from '@ankr.com/chains-list';

export const useSelectedProjectChain = (
  initiallySelectedChainIds: ChainID[],
  currentModalChain?: Chain,
) => {
  const [selectedProjectChainsIds, setSelectedProjectChainsIds] = useState<
    ChainID[]
  >(initiallySelectedChainIds);

  const shouldSetInitialChains =
    selectedProjectChainsIds.length === 0 &&
    initiallySelectedChainIds.length > 0;

  useEffect(() => {
    if (shouldSetInitialChains) {
      setSelectedProjectChainsIds(initiallySelectedChainIds);
    }
  }, [
    shouldSetInitialChains,
    selectedProjectChainsIds,
    initiallySelectedChainIds,
  ]);

  const isCurrentChainSelected =
    currentModalChain &&
    initiallySelectedChainIds.includes(currentModalChain?.id);

  const shouldAddCurrentModalChainId =
    currentModalChain?.id &&
    !selectedProjectChainsIds.includes(currentModalChain?.id);

  const handleSaveSelectedProjectChain = useCallback(() => {
    if (!isCurrentChainSelected) {
      return setSelectedProjectChainsIds(
        selectedProjectChainsIds.filter(
          chainId => chainId !== currentModalChain?.id,
        ),
      );
    }

    if (shouldAddCurrentModalChainId) {
      return setSelectedProjectChainsIds([
        ...selectedProjectChainsIds,
        currentModalChain.id,
      ]);
    }

    return setSelectedProjectChainsIds([...selectedProjectChainsIds]);
  }, [
    isCurrentChainSelected,
    currentModalChain?.id,
    selectedProjectChainsIds,
    shouldAddCurrentModalChainId,
  ]);

  return {
    selectedProjectChainsIds,
    setSelectedProjectChainsIds,
    onSaveSelectedChain: handleSaveSelectedProjectChain,
    isCurrentChainSelected,
  };
};
