import { Box, Checkbox } from '@mui/material';

import { ChainItem } from '../ChainItem';
import { ChainRowParams, useChainRow } from './hooks/useChainRow';

interface ChainRowProps extends ChainRowParams {
  className?: string;
}

export const ChainRow = ({
  chain,
  selectedProjectChainsIds,
  setSelectedChainsIds,
  className,
}: ChainRowProps) => {
  const { isCurrentChainActive, handleSelectChains } = useChainRow({
    chain,
    selectedProjectChainsIds,
    setSelectedChainsIds,
  });

  return (
    <Box
      alignItems="center"
      className={className}
      display="flex"
      onClick={handleSelectChains}
    >
      <Checkbox
        checked={isCurrentChainActive}
        onClick={handleSelectChains}
        sx={{ mr: 2 }}
      />
      <ChainItem chain={chain} />
    </Box>
  );
};
