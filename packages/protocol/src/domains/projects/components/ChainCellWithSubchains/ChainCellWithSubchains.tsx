import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { ChainID, ChainPath } from '@ankr.com/chains-list';
import { ArrowDown } from '@ankr.com/ui';

import { isChainHasOnlyOneNetwork } from 'modules/chains/utils/isChainHasOnlyOneNetwork';
import { ChainDescription } from 'modules/chains/components/ChainDescription';

import { ChainCellProps, useChainCell } from '../ChainCell/useChainCell';
import { useChainCellStyles } from '../ChainCell/useChainCellStyles';
import { useChainCellWithSubchains } from './useChainCellWithSubchains';
import { SubchainSelectors } from './SubchainSelectors';

export interface ChainCellWithSubchainsProps extends ChainCellProps {
  selectedChainPaths: ChainPath[];
  setSelectedChainPaths: Dispatch<SetStateAction<ChainPath[]>>;
  isCheckboxIndeterminate?: boolean;
  expandedId?: ChainID;
  setExpandedId: Dispatch<SetStateAction<ChainID | undefined>>;
}

export const ChainCellWithSubchains = ({
  areAllChainsSelected,
  chain,
  expandedId,
  isCheckboxChecked,
  isCheckboxIndeterminate,
  onChainSelect,
  selectedChainIds,
  selectedChainPaths,
  setExpandedId,
  setSelectedChainPaths,
}: ChainCellWithSubchainsProps) => {
  const { isAllChainsSelector, isChecked, isIndeterminate, onClick } =
    useChainCell({
      areAllChainsSelected,
      chain,
      isCheckboxChecked,
      isCheckboxIndeterminate,
      onChainSelect,
      selectedChainIds,
    });

  const { onChainClick, onToggleAccordion } = useChainCellWithSubchains({
    isChecked,
    onClick,
    setExpandedId,
    chainId: chain.id,
  });

  const { classes } = useChainCellStyles();

  const chainContent = (
    <>
      <Checkbox
        checked={isChecked}
        indeterminate={isIndeterminate}
        className={classes.checkbox}
        onClick={onChainClick}
      />
      <ChainDescription chain={chain} logoSize={32} isCompactView />
    </>
  );

  if (isAllChainsSelector || isChainHasOnlyOneNetwork(chain)) {
    return (
      <Box className={classes.chainCellroot} onClick={onChainClick}>
        {chainContent}
      </Box>
    );
  }

  return (
    <Box className={classes.chainCellroot}>
      <Accordion
        expanded={expandedId === chain.id}
        className={classes.chainAccordion}
      >
        <AccordionSummary
          onClick={onToggleAccordion}
          expandIcon={<ArrowDown />}
          className={classes.chainAccordionSummary}
        >
          {chainContent}
        </AccordionSummary>
        <AccordionDetails className={classes.chainCellAccordionDetails}>
          <SubchainSelectors
            chain={chain}
            setSelectedChainPaths={setSelectedChainPaths}
            selectedChainPaths={selectedChainPaths}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
