import { MouseEvent, useCallback, useMemo } from 'react';
import { ChainID } from '@ankr.com/chains-list';

import { useAppSelector } from 'store/useAppSelector';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { ProjectChain } from 'domains/projects/types';

export interface ChainCellProps {
  chain: ProjectChain;
  selectedChainIds: ChainID[];
  onChainSelect: (ids: ChainID[]) => void;
  isCheckboxChecked?: boolean;
  isCheckboxIndeterminate?: boolean;
  areAllChainsSelected: boolean;
}

export const useChainCell = ({
  areAllChainsSelected,
  chain,
  isCheckboxChecked,
  isCheckboxIndeterminate,
  onChainSelect,
  selectedChainIds,
}: ChainCellProps) => {
  const { id } = chain;

  const allSubchainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, id),
  );

  const onClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();

      return onChainSelect(allSubchainPaths as ChainID[]);
    },
    [onChainSelect, allSubchainPaths],
  );

  const isAllChainsSelector = id === ChainID.ALL_CHAINS;

  const isChecked = useMemo(() => {
    if (isAllChainsSelector) {
      return areAllChainsSelected;
    }

    if (typeof isCheckboxChecked === 'undefined') {
      return selectedChainIds.includes(id);
    }

    return isCheckboxChecked;
  }, [
    isAllChainsSelector,
    isCheckboxChecked,
    areAllChainsSelected,
    selectedChainIds,
    id,
  ]);

  const isIndeterminate = useMemo(() => {
    if (isAllChainsSelector) {
      return selectedChainIds.length > 0 && !areAllChainsSelected;
    }

    return isCheckboxChecked ? false : isCheckboxIndeterminate;
  }, [
    isAllChainsSelector,
    isCheckboxChecked,
    isCheckboxIndeterminate,
    selectedChainIds.length,
    areAllChainsSelected,
  ]);

  return {
    onClick,
    isChecked,
    isIndeterminate,
    isAllChainsSelector,
  };
};
