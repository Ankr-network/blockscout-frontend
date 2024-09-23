import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-final-form';
import isEqual from 'lodash.isequal';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';
import { ChainStepFields } from 'domains/projects/store';

import { useChainSelectModal } from './useChainSelectModal';
import { useProjectChains } from '../../../hooks/useProjectChains';
import { useSelectedProjectChain } from './useSelectedProjectChain';
import { useChainsTableColumns } from './useChainsTableColumns';
import { chainIdMapper } from '../utils/chainIdMapper';
import { sortChainIds } from '../utils/sortChainIds';

// eslint-disable-next-line max-lines-per-function
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

  const allChainsIds: ChainID[] = useMemo(() => {
    const allAvailableMainnetIds = projectChains
      .filter(({ mainnets = [] }) => mainnets?.length)
      .flatMap(chainItem =>
        chainItem.mainnets?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableTestnetIds = projectChains
      .filter(({ testnets = [] }) => testnets?.length)
      .flatMap(chainItem =>
        chainItem.testnets?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableDevnetIds = projectChains
      .filter(({ devnets = [] }) => devnets?.length)
      .flatMap(chainItem =>
        chainItem.devnets?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableBeaconMainnetIds = projectChains
      .filter(({ beaconsMainnet = [] }) => beaconsMainnet?.length)
      .flatMap(chainItem =>
        chainItem.beaconsMainnet?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableBeaconTestnetIds = projectChains
      .filter(({ beaconsTestnet = [] }) => beaconsTestnet?.length)
      .flatMap(chainItem =>
        chainItem.beaconsTestnet?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableOpnodeMainnetIds = projectChains
      .filter(({ opnodesMainnet = [] }) => opnodesMainnet?.length)
      .flatMap(chainItem =>
        chainItem.opnodesMainnet?.flatMap(chainIdMapper),
      ) as ChainID[];
    const allAvailableOpnodeTestnetIds = projectChains
      .filter(({ opnodesTestnet = [] }) => opnodesTestnet?.length)
      .flatMap(chainItem =>
        chainItem.opnodesTestnet?.flatMap(chainIdMapper),
      ) as ChainID[];

    return allAvailableMainnetIds
      .concat(allAvailableTestnetIds)
      .concat(allAvailableDevnetIds)
      .concat(allAvailableBeaconMainnetIds)
      .concat(allAvailableBeaconTestnetIds)
      .concat(allAvailableOpnodeMainnetIds)
      .concat(allAvailableOpnodeTestnetIds);
  }, [projectChains]);

  const { allSelectedChainIds, initiallySelectedChainIds, onChange } =
    useProjectFormValues(projectChains);

  const isAllChainsSelected = isEqual(
    allChainsIds.sort(sortChainIds),
    allSelectedChainIds.sort(sortChainIds),
  );

  useEffect(() => {
    if (isAllChainsSelected) {
      onChange(ChainStepFields.isSelectedAll, true);
    } else {
      onChange(ChainStepFields.isSelectedAll, false);
    }
  }, [isAllChainsSelected, onChange]);

  const {
    isCurrentChainSelected,
    onSaveSelectedChain,
    selectedProjectChainsIds,
    setSelectedProjectChainsIds,
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
