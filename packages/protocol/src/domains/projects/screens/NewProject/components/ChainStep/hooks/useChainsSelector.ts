import { useRef } from 'react';
import { useForm } from 'react-final-form';

import { useChains } from 'domains/dashboard/screens/Dashboard/hooks/useChains';
import { useChainsSelector as useChainsSelect } from 'domains/dashboard/screens/Dashboard/hooks/useChainsSelector';
import { useChainSelectorGroups } from 'domains/dashboard/screens/Dashboard/hooks/useChainSelectorGroups';
import { fallbackChain } from 'domains/dashboard/screens/Dashboard/const';
import { ChainID, ChainType } from 'modules/chains/types';
import { ChainGroupID } from 'modules/endpoints/types';

const shouldHideMainnet = (chainID?: ChainID) => {
  const isZetaChain = chainID === ChainID.ZETACHAIN;

  return isZetaChain;
};

export const useChainsSelector = (
  nestedSelectedChainId: ChainID,
  onBlockedTabClick: () => void,
) => {
  const { allChains, processedChains: chains } = useChains();

  const {
    chain: chainSelectItem,
    isTestnetOnlyChainSelected,
    unfilteredChain,
  } = useChainsSelect({
    chains,
    allChains,
    nestedSelectedChainId,
  });

  const { getState } = useForm();

  const {
    values: { chainType: selectedChainType, groupId: selectedGroupId },
  } = getState();

  const savedChainType = useRef<ChainType | undefined>(selectedChainType);
  const savedGroupId = useRef<ChainGroupID | undefined>(selectedGroupId);

  const {
    chainProtocolContext,
    chainType,
    chainTypes,
    detailsChainId,
    endpoints,
    groupID,
    groups,
    selectGroup,
    selectType,
  } = useChainSelectorGroups({
    chain: chainSelectItem || fallbackChain,
    unfilteredChain: unfilteredChain || fallbackChain,
    selectedType: savedChainType.current,
    selectedGroupId: savedGroupId.current,
    onBlockedTabClick,
  });

  const isMainnetHidden = shouldHideMainnet(chainSelectItem?.id);

  const chainTypesForTypeSelector = isMainnetHidden
    ? chainTypes.filter(type => type.value !== ChainType.Mainnet)
    : chainTypes;

  const hasTypeSelector = !isTestnetOnlyChainSelected || isMainnetHidden;

  return {
    chainProtocolContext,
    chainTypes: chainTypesForTypeSelector,
    selectType,
    groups,
    selectGroup,
    isTestnetOnlyChainSelected,
    chainType,
    groupId: groupID,
    endpoints,
    detailsChainId,
    hasTypeSelector,
  };
};
