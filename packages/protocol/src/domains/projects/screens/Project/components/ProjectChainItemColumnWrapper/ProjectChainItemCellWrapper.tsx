import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { ChainID, ChainPath } from '@ankr.com/chains-list';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectAllChainsPaths,
  selectAllPathsByChainId,
  selectChainIdsByPaths,
} from 'modules/chains/store/selectors';
import { ChainCellWithSubchains } from 'domains/projects/components/ChainCellWithSubchains';
import { ProjectChain } from 'domains/projects/types';

interface ProjectChainItemProps {
  chain: ProjectChain;
  selectedChainPaths: ChainPath[];
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  setSelectedChainPaths: Dispatch<SetStateAction<ChainPath[]>>;
  expandedId?: ChainID;
  setExpandedId: Dispatch<SetStateAction<ChainID | undefined>>;
}

export const ProjectChainItemCellWrapper = ({
  chain,
  expandedId,
  selectAllSubChainPaths,
  selectedChainPaths,
  setExpandedId,
  setSelectedChainPaths,
  unSelectAllSubChainPaths,
}: ProjectChainItemProps) => {
  const allPaths = useAppSelector(selectAllChainsPaths);

  const allSubchainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const selectedChainIds = useAppSelector(state =>
    selectChainIdsByPaths(state, selectedChainPaths),
  );

  const isCheckboxChecked = useMemo(
    () => allSubchainPaths?.every(path => selectedChainPaths.includes(path)),
    [selectedChainPaths, allSubchainPaths],
  );

  const isCheckboxIndeterminate = useMemo(
    () => allSubchainPaths?.some(path => selectedChainPaths.includes(path)),
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

  const areAllChainsSelected = useMemo(() => {
    return allPaths.every(path => selectedChainPaths.includes(path));
  }, [allPaths, selectedChainPaths]);

  return (
    <ChainCellWithSubchains
      chain={chain}
      onChainSelect={onChainSelect}
      selectedChainIds={selectedChainIds}
      selectedChainPaths={selectedChainPaths}
      setSelectedChainPaths={setSelectedChainPaths}
      isCheckboxIndeterminate={isCheckboxIndeterminate}
      isCheckboxChecked={isCheckboxChecked}
      areAllChainsSelected={areAllChainsSelected}
      expandedId={expandedId}
      setExpandedId={setExpandedId}
    />
  );
};
