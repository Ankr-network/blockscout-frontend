import { useCallback, useEffect, useMemo } from 'react';
import { Chain, ChainPath } from '@ankr.com/chains-list';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectAllPathsByChainId,
  selectChainIdsByPaths,
} from 'modules/chains/store/selectors';
import { ChainCell } from 'domains/projects/components/ChainCell';
import { getSubchainIds } from 'modules/chains/utils/getSubchainIds';

interface ProjectChainItemProps {
  chain: Chain;
  allChains: Chain[];
  selectedChainPaths: ChainPath[];
  setIsSelectedAll: (isSelectedAll: boolean) => void;
  selectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
  unSelectAllSubChainPaths: (chainPaths: ChainPath[]) => void;
}

export const ProjectChainItemCellWrapper = ({
  allChains,
  chain,
  selectAllSubChainPaths,
  selectedChainPaths,
  setIsSelectedAll,
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

  const areAllChainsSelected = useMemo(() => {
    return allChains.every(chainItem => {
      const allChainIds = getSubchainIds(chainItem);

      return allChainIds.some(chainId => selectedChainIds.includes(chainId));
    });
  }, [allChains, selectedChainIds]);

  useEffect(() => {
    if (areAllChainsSelected) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [areAllChainsSelected, setIsSelectedAll]);

  return (
    <ChainCell
      chain={chain}
      onChainSelect={onChainSelect}
      selectedChainIds={selectedChainIds}
      isCheckboxChecked={isCheckboxChecked}
      areAllChainsSelected={areAllChainsSelected}
    />
  );
};
