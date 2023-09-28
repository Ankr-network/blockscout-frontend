import { useCallback, useMemo } from 'react';
import { useForm } from 'react-final-form';

import { ChainStepFields } from 'domains/projects/store';
import { Chain, ChainID } from 'domains/chains/types';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

import { NewProjectFormValues } from '../../NewProjectForm/NewProjectFormTypes';
import { isChainHasSingleOptionToSelect } from '../../../utils/isChainHasSingleOptionToSelect';

export interface ChainRowParams {
  chain: Chain;
  selectedProjectChainsIds: ChainID[];
  handleOpenModal: (chain: Chain) => void;
  setSelectedProjectChainsIds: (ids: ChainID[]) => void;
}

export const useChainRow = ({
  chain,
  selectedProjectChainsIds,
  setSelectedProjectChainsIds,
  handleOpenModal,
}: ChainRowParams) => {
  const { id } = chain;
  const isCurrentChainActive = selectedProjectChainsIds.includes(id);

  const { change, getState } = useForm<NewProjectFormValues>();
  const { values } = getState();

  const currentSelectedMainnetIds = useMemo(() => {
    return values[ChainStepFields.selectedMainnetIds] || [];
  }, [values]);

  const currentSelectedTestnetIds = useMemo(() => {
    return values[ChainStepFields.selectedTestnetIds] || [];
  }, [values]);

  const hasOnlyOneMainnetToSelect =
    (!chain.testnets?.length &&
      !chain.devnets?.length &&
      !chain.extensions?.length &&
      !chain.beacons?.length) ||
    isChainHasSingleOptionToSelect(chain.id);

  const hasOnlyOneTestnetToSelect =
    isTestnetOnlyChain(id) &&
    (chain.testnets?.length === 1 ||
      isChainHasSingleOptionToSelect(chain.id)) &&
    !chain.devnets?.length;

  const handleSelectChains = useCallback(() => {
    const selectedChainsListWithoutCurrentChain =
      selectedProjectChainsIds.filter(selectedId => selectedId !== id);

    const newSelectedChainsIds = isCurrentChainActive
      ? selectedChainsListWithoutCurrentChain
      : [...selectedProjectChainsIds, id];

    if (!isCurrentChainActive) {
      /* in this case we have no chains to select. there is a single option,
      so no need to open the modal. in this case we need to select chain id */
      if (hasOnlyOneTestnetToSelect) {
        change(ChainStepFields.selectedTestnetIds, [
          ...currentSelectedTestnetIds,
          id,
        ]);

        return setSelectedProjectChainsIds(newSelectedChainsIds);
      }

      /* we need to select mainnet by default on modal open if chain was not selected earlier */
      /* but for SECRET network should be used extenders instead of mainnet id and ZETACHAIN is testnet only */
      if (
        id !== ChainID.SECRET &&
        id !== ChainID.ZETACHAIN &&
        id !== ChainID.SCROLL
      ) {
        change(ChainStepFields.selectedMainnetIds, [
          ...currentSelectedMainnetIds,
          id,
        ]);
      }

      /* in this case we have no chains to select. there is a single option,
      so no need to open the modal. in this case we need to select chain id */
      if (hasOnlyOneMainnetToSelect) {
        return setSelectedProjectChainsIds(newSelectedChainsIds);
      }
    }

    if (isCurrentChainActive) {
      /* in this case we have no chains to select. there is a single option,
      so no need to open the modal. in this case we need so unselect chain id */
      if (hasOnlyOneMainnetToSelect) {
        change(
          ChainStepFields.selectedMainnetIds,
          currentSelectedMainnetIds.filter(selectedId => selectedId !== id),
        );

        return setSelectedProjectChainsIds(newSelectedChainsIds);
      }

      /* in this case we have no chains to select. there is a single option,
      so no need to open the modal. in this case we need so unselect chain id */
      if (hasOnlyOneTestnetToSelect) {
        change(
          ChainStepFields.selectedTestnetIds,
          currentSelectedTestnetIds.filter(selectedId => selectedId !== id),
        );

        return setSelectedProjectChainsIds(newSelectedChainsIds);
      }
    }

    /* for other cases we need to select networks in dialog */
    return handleOpenModal(chain);
  }, [
    change,
    handleOpenModal,
    id,
    selectedProjectChainsIds,
    setSelectedProjectChainsIds,
    chain,
    isCurrentChainActive,
    currentSelectedMainnetIds,
    hasOnlyOneMainnetToSelect,
    currentSelectedTestnetIds,
    hasOnlyOneTestnetToSelect,
  ]);

  return {
    isCurrentChainActive,
    handleSelectChains,
  };
};
