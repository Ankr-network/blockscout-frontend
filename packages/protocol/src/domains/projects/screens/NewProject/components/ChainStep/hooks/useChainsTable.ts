import { useCallback } from 'react';

import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { useChainSelectModal } from './useChainSelectModal';
import { useProjectChains } from '../../../hooks/useProjectChains';
import { useSelectedProjectChain } from './useSelectedProjectChain';
import { useChainsTableColumns } from './useChainsTableColumns';

export const useChainsTable = () => {
  const { isOpened, onClose, onOpenModal, currentModalChain } =
    useChainSelectModal();

  const { projectChains, isLoading } = useProjectChains();

  const { initiallySelectedChainIds } = useProjectFormValues(projectChains);

  const {
    selectedProjectChainsIds,
    setSelectedProjectChainsIds,
    onSaveSelectedChain,
    isCurrentChainSelected,
  } = useSelectedProjectChain(initiallySelectedChainIds, currentModalChain);

  const { columns } = useChainsTableColumns({
    onOpenModal,
    selectedProjectChainsIds,
    setSelectedProjectChainsIds,
  });

  const handleSetProjectChainsIdsAndClose = useCallback(() => {
    onSaveSelectedChain();
    onClose();
  }, [onSaveSelectedChain, onClose]);

  return {
    isLoading,
    columns,
    projectChains,
    isOpened,
    currentModalChain,
    handleCloseModal: handleSetProjectChainsIdsAndClose,
    isCurrentChainSelected,
  };
};
