import { useEffect, useState } from 'react';
import { useFetchBlockchainsQuery } from 'modules/clients/actions/fetchBlockchains';
import { SelectChangeEvent } from '@mui/material';

export const useClientApiKeys = ({ token }: { token: string }) => {
  const { data: blockchainsData, isLoading: isLoadingBlockchains } =
    useFetchBlockchainsQuery({ token });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedChainId, setSelectedChainId] = useState('');
  const handleSelectChain = (event: SelectChangeEvent<string>) => {
    setSelectedChainId(event.target.value as string);
  };
  useEffect(() => {
    if (
      !isLoadingBlockchains &&
      blockchainsData &&
      blockchainsData.length > 0
    ) {
      setSelectedChainId(blockchainsData[0].id);
    }
  }, [blockchainsData, isLoadingBlockchains]);

  const selectedChain = blockchainsData?.find(
    chain => chain.id === selectedChainId,
  );

  return {
    open,
    handleOpen,
    handleClose,
    blockchainsData,
    selectedChainId,
    handleSelectChain,
    selectedChain,
    isLoadingBlockchains,
  };
};
