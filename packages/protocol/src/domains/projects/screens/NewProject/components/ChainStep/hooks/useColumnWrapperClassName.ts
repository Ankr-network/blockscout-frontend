import { useCallback } from 'react';

import { ChainID } from 'domains/chains/types';

import { useChainStepTableStyles } from '../useChainStepTableStyles';

export const useColumnWrapperClassName = (selectedChainsIds: ChainID[]) => {
  const { classes, cx } = useChainStepTableStyles();

  const getColumnWrapperClassName = useCallback(
    (id: ChainID, className?: string) => {
      const isCurrentChainActive = selectedChainsIds.includes(id);
      const hasOpacity =
        selectedChainsIds.some(Boolean) && !isCurrentChainActive;

      return cx({ [classes.inactive]: hasOpacity }, className);
    },
    [selectedChainsIds, cx, classes.inactive],
  );

  return { getColumnWrapperClassName };
};
