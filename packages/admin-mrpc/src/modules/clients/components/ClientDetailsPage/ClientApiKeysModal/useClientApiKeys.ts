import { useEffect, useState } from 'react';
import { useChainSelect } from 'modules/common/components/ChainSelect/useChainSelect';

export const useClientApiKeys = ({ token }: { token: string }) => {
  const {
    selectedChainId,
    handleSelectChain,
    isLoadingBlockchains,
    blockchainsData,
    setSelectedChainId,
  } = useChainSelect(token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      !isLoadingBlockchains &&
      blockchainsData &&
      blockchainsData.length > 0
    ) {
      setSelectedChainId(blockchainsData[0].id);
    }
  }, [blockchainsData, isLoadingBlockchains, setSelectedChainId]);

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
