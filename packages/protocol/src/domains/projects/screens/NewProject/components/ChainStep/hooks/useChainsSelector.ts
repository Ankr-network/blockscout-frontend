import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-final-form';

import { useChains } from 'domains/dashboard/screens/Dashboard/hooks/useChains';
import { useChainsSelector as useChainsSelect } from 'domains/dashboard/screens/Dashboard/hooks/useChainsSelector';
import { useChainSelectorGroups } from 'domains/dashboard/screens/Dashboard/hooks/useChainSelectorGroups';
import { usePrivateChainSelector } from 'domains/dashboard/screens/Dashboard/hooks/usePrivateChainSelector';
import { fallbackChain } from 'domains/dashboard/screens/Dashboard/const';
import { ChainID, ChainType } from 'domains/chains/types';
import { ChainStepFields } from 'domains/projects/store';
import { filterNonEvmGroups } from 'modules/endpoints/utils/filterNonEvmGroups';
import { ChainGroupID } from 'modules/endpoints/types';

export const useChainsSelector = (nestedSelectedChainId: ChainID) => {
  const { processedChains: chains, allChains } = useChains();

  const {
    chain: chainSelectItem,
    unfilteredChain,
    isTestnetOnlyChainSelected,
  } = useChainsSelect({
    chains,
    allChains,
    nestedSelectedChainId,
  });

  const { change, getState } = useForm();

  const {
    values: { groupId: selectedGroupId, chainType: selectedChainType },
  } = getState();

  const savedChainType = useRef<ChainType | undefined>(selectedChainType);
  const savedGroupId = useRef<ChainGroupID | undefined>(selectedGroupId);

  const {
    chainProtocolContext,
    chainType,
    chainTypes,
    selectType,
    groups,
    groupID,
    selectGroup,
    detailsChainId: chainId,
  } = useChainSelectorGroups({
    chain: chainSelectItem || fallbackChain,
    unfilteredChain: unfilteredChain || fallbackChain,
    selectedType: savedChainType.current,
    selectedGroupId: savedGroupId.current,
  });

  useEffect(() => {
    change(ChainStepFields.chainId, chainSelectItem?.id);
    change(ChainStepFields.subChainId, chainId);
    change(ChainStepFields.chainType, chainType);
    change(ChainStepFields.groupId, groupID);
    change(ChainStepFields.chainName, chainSelectItem?.name);
    // we need to update the form values only on chainId change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  const { classNameMenuItem, menuProps } = usePrivateChainSelector();

  const nonEvmGroups = useMemo(() => filterNonEvmGroups(groups), [groups]);

  return {
    chainProtocolContext,
    chainTypes,
    selectType,
    nonEvmGroups,
    selectGroup,
    isTestnetOnlyChainSelected,
    classNameMenuItem,
    menuProps,
    chainType,
    groupId: groupID,
  };
};
