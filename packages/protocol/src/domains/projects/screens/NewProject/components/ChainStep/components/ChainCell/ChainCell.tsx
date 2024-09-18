import { Chain } from '@ankr.com/chains-list';

import { ChainCell as ChainCellBase } from 'domains/projects/components/ChainCell';

import { UseChainCellParams, useChainCell } from './hooks/useChainCell';

interface ChainCellProps extends UseChainCellParams {
  allChains: Chain[];
}

export const ChainCell = ({
  allChains,
  chain,
  selectedProjectChainsIds,
  setSelectedChainsIds,
}: ChainCellProps) => {
  const { areAllChainsSelected, handleSelectChains } = useChainCell({
    allChains,
    chain,
    selectedProjectChainsIds,
    setSelectedChainsIds,
  });

  return (
    <ChainCellBase
      chain={chain}
      onChainSelect={handleSelectChains}
      selectedChainIds={selectedProjectChainsIds}
      areAllChainsSelected={areAllChainsSelected}
    />
  );
};
