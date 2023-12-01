import { ChainCell as ChainCellBase } from 'domains/projects/components/ChainCell';
import { Chain } from 'modules/chains/types';

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
  const { handleSelectChains, areAllChainsSelected } = useChainCell({
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
