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
}

export const useDashboardChains = ({
  chains,
  allChains,
}: IChainSelectorProps) => {
  const { options, renderValue, defaultValue } = useChainSelector(chains);

  const [selectedChainId, setSelectedChainId] = useState<ChainID>(defaultValue);

  const { selectedGroupAddress } = useSelectedUserGroup();
  const { selectedProject } = useTokenManagerConfigSelector();

  useEffect(() => {
    setSelectedChainId(defaultValue);
  }, [selectedGroupAddress, selectedProject, defaultValue]);

  const handleChange = useCallback((event: SelectChangeEvent<ChainID>) => {
    const { value } = event.target;
    setSelectedChainId(value as ChainID);
  }, []);

  const chain = useMemo(
    () => chains.find(item => item.id === selectedChainId),
    [chains, selectedChainId],
  );

  const unfilteredChain = useMemo(
    () => allChains.find(item => item.id === selectedChainId),
    [allChains, selectedChainId],
  );

  const showAdditionalSelect = Boolean(
    selectedChainId !== ALL_CHAINS_VALUE && chain && unfilteredChain,
  );

  const isTestnetOnlyChainSelected = Boolean(
    selectedChainId && isTestnetOnlyChain(selectedChainId),
  );

  return {
    selectedChainId,
    handleChange,
    renderValue,
    options,
    showAdditionalSelect,
    chain,
    unfilteredChain,
    isTestnetOnlyChainSelected,
  };
};
