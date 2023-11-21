import { Box, Checkbox } from '@mui/material';
import { MouseEvent, useCallback, useMemo } from 'react';

import { Chain, ChainID } from 'modules/chains/types';
import { ChainInfo } from 'domains/projects/components/ChainInfo';
import { useAppSelector } from 'store/useAppSelector';
import { selectAllPathsByChainId } from 'modules/chains/store/selectors';

import { useChainCellStyles } from './useChainCellStyles';

export interface ChainCellProps {
  chain: Chain;
  selectedChainIds: ChainID[];
  onChainSelect: (ids: ChainID[]) => void;
  isCheckboxChecked?: boolean;
}

export const ChainCell = ({
  chain,
  onChainSelect,
  selectedChainIds,
  isCheckboxChecked,
}: ChainCellProps) => {
  const { id } = chain;

  const allSubchainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, id),
  );

  const onClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();

      onChainSelect(allSubchainPaths as ChainID[]);
    },
    [onChainSelect, allSubchainPaths],
  );

  const { classes } = useChainCellStyles();

  const isChecked = useMemo(() => {
    if (typeof isCheckboxChecked === 'undefined') {
      return selectedChainIds.includes(chain.id);
    }

    return isCheckboxChecked;
  }, [chain.id, isCheckboxChecked, selectedChainIds]);

  return (
    <Box className={classes.root} onClick={onClick}>
      <Checkbox
        checked={isChecked}
        className={classes.checkbox}
        onClick={onClick}
      />
      <ChainInfo chain={chain} />
    </Box>
  );
};
