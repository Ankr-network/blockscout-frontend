import { useCallback } from 'react';
import { useForm } from 'react-final-form';

import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { useChainSelectModal } from './useChainSelectModal';
import { useProjectChains } from '../../../hooks/useProjectChains';
import { useSelectedProjectChain } from './useSelectedProjectChain';
import { useChainsTableColumns } from './useChainsTableColumns';

export const useChainsTable = () => {
  const {
    currentModalChain,
    isOpened,
    onClose,
    onOpenModal,
    valuesBeforeChange: valuesBeforeChangeInSelectModal,
  } = useChainSelectModal();

  const { reset } = useForm();

  const { projectChains, isLoading, isUninitialized } = useProjectChains();

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

  const handleCloseModal = useCallback(() => {
    if (valuesBeforeChangeInSelectModal) {
      reset(valuesBeforeChangeInSelectModal);
    }

    onClose();
  }, [reset, onClose, valuesBeforeChangeInSelectModal]);

  return {
    columns,
    currentModalChain,
    handleCloseModal,
    handleConfirmModal: handleSetProjectChainsIdsAndClose,
    isCurrentChainSelected,
    isLoading,
    isOpened,
    isUninitialized,
    projectChains,
  };
};
