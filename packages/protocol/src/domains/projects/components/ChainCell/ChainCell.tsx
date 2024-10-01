import { Box, Checkbox } from '@mui/material';

import { ChainInfo } from 'domains/projects/components/ChainInfo';

import { useChainCellStyles } from './useChainCellStyles';
import { ChainCellProps, useChainCell } from './useChainCell';

export const ChainCell = ({
  areAllChainsSelected,
  chain,
  isCheckboxChecked,
  onChainSelect,
  selectedChainIds,
}: ChainCellProps) => {
  const { isChecked, isIndeterminate, onClick } = useChainCell({
    areAllChainsSelected,
    chain,
    isCheckboxChecked,
    onChainSelect,
    selectedChainIds,
  });

  const { classes } = useChainCellStyles();

  return (
    <Box className={classes.chainCellroot} onClick={onClick}>
      <Checkbox
        checked={isChecked}
        indeterminate={isIndeterminate}
        className={classes.checkbox}
        onClick={onClick}
      />
      <ChainInfo chain={chain} />
    </Box>
  );
};
