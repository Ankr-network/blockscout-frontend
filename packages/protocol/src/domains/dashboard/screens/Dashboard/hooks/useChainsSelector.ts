import { useCallback, useMemo, useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { Chain, ChainID } from 'domains/chains/types';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

import {
  ALL_CHAINS_VALUE,
  useChainSelector,
} from '../components/ChainSelector/hooks/useChainSelector';

interface IChainSelectorProps {
  chains: Chain[];
  allChains: Chain[];
  nestedSelectedChainId?: ChainID;
}

export const useChainsSelector = ({
  chains,
  allChains,
  nestedSelectedChainId,
}: IChainSelectorProps) => {
  const { options, renderValue, defaultValue } = useChainSelector(chains);

  const [selectedChainId, setSelectedChainId] = useState<ChainID>(defaultValue);
  const chainId = nestedSelectedChainId || selectedChainId;

  const { selectedGroupAddress } = useSelectedUserGroup();
  const { selectedProjectEndpointToken } = useTokenManagerConfigSelector();

  useEffect(() => {
    setSelectedChainId(defaultValue);
  }, [selectedGroupAddress, selectedProjectEndpointToken, defaultValue]);

  const handleChange = useCallback((event: SelectChangeEvent<ChainID>) => {
    const { value } = event.target;

    setSelectedChainId(value as ChainID);
  }, []);

  const chain = useMemo(
    () => chains.find(item => item.id === chainId),
    [chains, chainId],
  );

  const unfilteredChain = useMemo(
    () => allChains.find(item => item.id === chainId),
    [allChains, chainId],
  );

  const showAdditionalSelect = Boolean(
    chainId !== ALL_CHAINS_VALUE && chain && unfilteredChain,
  );

  const isTestnetOnlyChainSelected = Boolean(
    chainId && isTestnetOnlyChain(chainId),
  );

  return {
    selectedChainId: chainId,
    handleChange,
    renderValue,
    options,
    showAdditionalSelect,
    chain,
    unfilteredChain,
    isTestnetOnlyChainSelected,
  };
};
