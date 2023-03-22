import { useCallback, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { useFetchBlockchainsQuery } from 'modules/clients/actions/fetchBlockchains';

export const useChainSelect = (token?: string) => {
  const { data: blockchainsData, isLoading: isLoadingBlockchains } =
    useFetchBlockchainsQuery({ token });

  const [selectedChainId, setSelectedChainId] = useState('');

  const handleSelectChain = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedChainId(event.target.value as string);
  }, []);

  return {
    selectedChainId,
    handleSelectChain,
    isLoadingBlockchains,
    blockchainsData,
    setSelectedChainId,
  };
};
