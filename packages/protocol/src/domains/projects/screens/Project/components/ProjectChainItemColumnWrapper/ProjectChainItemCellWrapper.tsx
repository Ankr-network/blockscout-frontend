import { useCallback, useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectAllPathsByChainId,
  selectChainIdsByPaths,
} from 'modules/chains/store/selectors';
import { Chain, ChainPath } from 'modules/chains/types';
import { ChainCell } from 'domains/projects/components/ChainCell';

interface ProjectChainItemProps {
  chain: Chain;
  selectedChainPaths: ChainPath[];
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
}

export const ProjectChainItemCellWrapper = ({
  chain,
  selectedChainPaths,
  selectAllSubChainPaths,
  unSelectAllSubChainPaths,
}: ProjectChainItemProps) => {
  const allSubchainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const selectedChainIds = useAppSelector(state =>
    selectChainIdsByPaths(state, selectedChainPaths),
  );

  const isCheckboxChecked = useMemo(
    () => selectedChainPaths?.some(path => allSubchainPaths.includes(path)),
    [selectedChainPaths, allSubchainPaths],
  );

  const onChainSelect = useCallback(() => {
    if (isCheckboxChecked) {
      unSelectAllSubChainPaths(allSubchainPaths);
    } else {
      selectAllSubChainPaths(allSubchainPaths);
    }
  }, [
    allSubchainPaths,
    isCheckboxChecked,
    selectAllSubChainPaths,
    unSelectAllSubChainPaths,
  ]);

  return (
    <ChainCell
      chain={chain}
      onChainSelect={onChainSelect}
      selectedChainIds={selectedChainIds}
      isCheckboxChecked={isCheckboxChecked}
    />
  );
};
