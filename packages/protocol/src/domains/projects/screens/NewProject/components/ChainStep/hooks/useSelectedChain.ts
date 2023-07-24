import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-final-form';

import { ChainID } from 'domains/chains/types';

import { useChainStepTableStyles } from '../useChainStepTableStyles';
import { ChainStepFields } from '../../../../../store';

export const useSelectedChain = () => {
  const { classes, cx } = useChainStepTableStyles();

  const { getState, change } = useForm();

  const { values } = getState();

  const defaultSelectedChainId = values.chainId;

  const [selectedChainId, setSelectedChainId] = useState<ChainID | undefined>(
    defaultSelectedChainId,
  );

  useEffect(() => {
    /* setting up initial values for chain related form data if user unselects a chain */
    if (!selectedChainId) {
      change(ChainStepFields.chainId, undefined);
      change(ChainStepFields.subChainId, undefined);
      change(ChainStepFields.chainType, undefined);
      change(ChainStepFields.groupId, undefined);
      change(ChainStepFields.chainName, undefined);
    }
  }, [change, selectedChainId]);

  const getColumnWrapperClassName = useCallback(
    (id: ChainID, className?: string) => {
      const isCurrentChainActive = selectedChainId === id;
      const hasOpacity = Boolean(selectedChainId) && !isCurrentChainActive;

      return cx({ [classes.inactive]: hasOpacity }, className);
    },
    [selectedChainId, cx, classes.inactive],
  );

  return {
    selectedChainId,
    setSelectedChainId,
    getColumnWrapperClassName,
  };
};
