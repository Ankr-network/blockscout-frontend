import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { AddSmartContractForm } from 'domains/projects/screens/Project/components/AddSmartContractForm';
import { ProjectSidebarProps } from 'domains/projects/screens/Project/components/ProjectSidebar';
import { useWhitelistItemInput } from 'domains/projects/screens/Project/components/WhitelistItemInput';
import { validateSmartContractAddress } from 'modules/common/utils/validateSmartContractAddress';

import { useAddWhitelistItemHandler } from './useAddWhitelistItemHandler';
import { useValidator } from './useValidator';
import { useWhitelistItemChainsSelector } from '../../WhitelistItemChainsSelector';

export interface UseAddSmartContractSidebarPropsParams {
  isOpened: boolean;
  isSmartContractsListFull: boolean;
  onClose: () => void;
  setWhitelistContent: () => void;
  smartContractsCount: number;
  whitelist: WhitelistItem[];
}

const type = UserEndpointTokenMode.ADDRESS;

export const useAddSmartContractSidebarProps = ({
  isOpened,
  isSmartContractsListFull,
  onClose,
  setWhitelistContent,
  smartContractsCount,
  whitelist,
}: UseAddSmartContractSidebarPropsParams) => {
  const validate = useValidator({
    type,
    validate: validateSmartContractAddress,
  });

  const {
    error,
    isValid: isAddressValid,
    onChange,
    reset: resetInputState,
    value,
  } = useWhitelistItemInput({ validate });

  const {
    handleSelectBlockchain,
    isValid: isSelectorValid,
    reset: resetSelectorState,
    selectedBlockchains,
    subchains,
  } = useWhitelistItemChainsSelector();

  const reset = useCallback(() => {
    resetInputState();
    setWhitelistContent();
    resetSelectorState();
  }, [resetInputState, resetSelectorState, setWhitelistContent]);

  const { handleAddItemToProjectWhitelists, isAdding } =
    useAddWhitelistItemHandler({
      address: value,
      blockchains: selectedBlockchains,
      onSuccess: reset,
      type,
      whitelist,
    });

  const sidebarProps = useMemo((): ProjectSidebarProps => {
    const hasSelectedBlockchains = selectedBlockchains.length > 0;
    const hasValue = Boolean(value);

    const isConfirmationDisabled =
      !hasSelectedBlockchains ||
      !hasValue ||
      !isAddressValid ||
      !isSelectorValid ||
      isSmartContractsListFull;

    return {
      children: (
        <AddSmartContractForm
          address={value}
          handleSelectBlockchain={handleSelectBlockchain}
          inputError={error}
          isAddressValid={isAddressValid}
          isSelectorValid={isSelectorValid}
          onAddressChange={onChange}
          selectedBlockchains={selectedBlockchains}
          smartContractsCount={smartContractsCount}
          subchains={subchains}
        />
      ),
      hasBackButton: true,
      hasFooter: true,
      isConfirmationDisabled,
      isConfirming: isAdding,
      isOpened,
      onBackButtonClick: reset,
      onCancelButtonClick: reset,
      onClose: () => {
        onClose();
        reset();
      },
      onConfirmButtonClick: handleAddItemToProjectWhitelists,
    };
  }, [
    error,
    handleAddItemToProjectWhitelists,
    handleSelectBlockchain,
    isAdding,
    isAddressValid,
    isOpened,
    isSelectorValid,
    isSmartContractsListFull,
    onChange,
    onClose,
    reset,
    selectedBlockchains,
    smartContractsCount,
    subchains,
    value,
  ]);

  return sidebarProps;
};
