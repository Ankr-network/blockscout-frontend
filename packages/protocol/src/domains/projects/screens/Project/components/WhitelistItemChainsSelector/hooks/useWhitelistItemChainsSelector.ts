import { useCallback, useEffect, useState } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { handleBlockchainSelection } from '../utils/handleBlockchainSelection';
import { useSubchains } from './useSubchains';

const defaultBlockchains: ChainPath[] = [];

export const useWhitelistItemChainsSelector = (
  initiallySelectedBlockchains = defaultBlockchains,
) => {
  const { subchains } = useSubchains();

  const [selectedBlockchains, setSelectedBlockchains] = useState(
    initiallySelectedBlockchains,
  );
  const [isValid, setIsValid] = useState(true);

  const handleSelectBlockchain = useCallback(
    (blockchain: ChainPath) => {
      const newBlockchains = handleBlockchainSelection({
        blockchain,
        existingBlockchains: selectedBlockchains,
      });

      setSelectedBlockchains(newBlockchains);
      setIsValid(newBlockchains.length > 0);
    },
    [selectedBlockchains],
  );

  const reset = useCallback(() => {
    setSelectedBlockchains(initiallySelectedBlockchains);
    setIsValid(true);
  }, [initiallySelectedBlockchains]);

  useEffect(() => {
    setSelectedBlockchains(initiallySelectedBlockchains);
  }, [initiallySelectedBlockchains]);

  return {
    handleSelectBlockchain,
    isValid,
    reset,
    selectedBlockchains,
    subchains,
  };
};
