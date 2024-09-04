import { useCallback, useMemo, useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { Chain, ChainID } from 'modules/chains/types';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

import {
  ALL_CHAINS_VALUE,
  useChainSelector,
} from '../components/ChainSelector/hooks/useChainSelector';

interface IChainSelectorProps {
  chains: Chain[];
  chainIdsWithStats: ChainID[];
  nestedSelectedChainId?: ChainID;
}

export const useChainsSelector = ({
  chainIdsWithStats,
  chains,
  nestedSelectedChainId,
}: IChainSelectorProps) => {
  const { defaultValue, options, renderValue } = useChainSelector(
    chains,
    chainIdsWithStats,
  );

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

  const showAdditionalSelect = Boolean(chainId !== ALL_CHAINS_VALUE && chain);

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
    isTestnetOnlyChainSelected,
  };
};
