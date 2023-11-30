import { useCallback, useState } from 'react';
import { useForm } from 'react-final-form';

import { Chain, ChainID } from 'modules/chains/types';
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

  const [
    selectedChainIdsBeforeChangeInSelectModal,
    setSelectedChainIdsBeforeChangeInSelectModal,
  ] = useState<ChainID[]>();

  const { reset } = useForm();

  const { projectChains } = useProjectChains();

  const { initiallySelectedChainIds } = useProjectFormValues(projectChains);

  const {
    selectedProjectChainsIds,
    setSelectedProjectChainsIds,
    onSaveSelectedChain,
    isCurrentChainSelected,
  } = useSelectedProjectChain(initiallySelectedChainIds, currentModalChain);

  const handleOpenModal = useCallback(
    (chain: Chain) => {
      setSelectedChainIdsBeforeChangeInSelectModal(selectedProjectChainsIds);
      onOpenModal(chain);
    },
    [onOpenModal, selectedProjectChainsIds],
  );

  const { columns } = useChainsTableColumns({
    onOpenModal: handleOpenModal,
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

    if (selectedChainIdsBeforeChangeInSelectModal) {
      setSelectedProjectChainsIds(selectedChainIdsBeforeChangeInSelectModal);
    }

    onClose();
  }, [
    onClose,
    reset,
    selectedChainIdsBeforeChangeInSelectModal,
    setSelectedProjectChainsIds,
    valuesBeforeChangeInSelectModal,
  ]);

  return {
    columns,
    currentModalChain,
    handleCloseModal,
    handleConfirmModal: handleSetProjectChainsIdsAndClose,
    isCurrentChainSelected,
    isOpened,
    projectChains,
  };
};
