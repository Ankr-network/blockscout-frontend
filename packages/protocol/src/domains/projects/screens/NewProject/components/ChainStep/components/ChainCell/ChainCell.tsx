import { ChainCell as ChainCellBase } from 'domains/projects/components/ChainCell';

import { UseChainCellParams, useChainCell } from './hooks/useChainCell';

interface ChainCellProps extends UseChainCellParams {}

export const ChainCell = ({
  chain,
  selectedProjectChainsIds,
  setSelectedChainsIds,
}: ChainCellProps) => {
  const { handleSelectChains } = useChainCell({
    chain,
    selectedProjectChainsIds,
    setSelectedChainsIds,
  });

  return (
    <ChainCellBase
      chain={chain}
      onChainSelect={handleSelectChains}
      selectedChainIds={selectedProjectChainsIds}
    />
  );
};
