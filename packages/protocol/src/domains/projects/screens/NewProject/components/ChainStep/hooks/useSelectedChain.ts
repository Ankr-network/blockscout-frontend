import { useCallback, useState } from 'react';
import { useForm } from 'react-final-form';

import { ChainID } from 'domains/chains/types';
import { useChainStepTableStyles } from '../useChainStepTableStyles';

export const useSelectedChain = () => {
  const { classes, cx } = useChainStepTableStyles();

  const form = useForm();

  const { values } = form.getState();

  const defaultSelectedChainId = values.chainId;

  const [selectedChainId, setSelectedChainId] = useState<ChainID | undefined>(
    defaultSelectedChainId,
  );

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
