import { Box, Checkbox } from '@mui/material';
import { MouseEvent, useCallback, useMemo } from 'react';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { ChainInfo } from 'domains/projects/components/ChainInfo';
import { useAppSelector } from 'store/useAppSelector';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';

import { useChainCellStyles } from './useChainCellStyles';

export interface ChainCellProps {
  chain: Chain;
  selectedChainIds: ChainID[];
  onChainSelect: (ids: ChainID[]) => void;
  isCheckboxChecked?: boolean;
  areAllChainsSelected: boolean;
}

export const ChainCell = ({
  areAllChainsSelected,
  chain,
  isCheckboxChecked,
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

  const { classes } = useChainCellStyles();

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

    return false;
  }, [isAllChainsSelector, selectedChainIds.length, areAllChainsSelected]);

  return (
    <Box className={classes.root} onClick={onClick}>
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
