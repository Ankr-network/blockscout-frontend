import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { EditSmartContractForm } from 'domains/projects/screens/Project/components/EditSmartContractForm';
import { ProjectSidebarProps } from 'domains/projects/screens/Project/components/ProjectSidebar';
import { useWhitelistItemInput } from 'domains/projects/screens/Project/components/WhitelistItemInput';
import { validateSmartContractAddress } from 'modules/common/utils/validateSmartContractAddress';

import { useEditWhitelistItemsHandler } from './useEditWhitelistItemsHandler';
import { useInitiallySelectedBlockchains } from './useInitiallySelectedBlockchains';
import { useValidator } from './useValidator';
import { useWhitelistItemChainsSelector } from '../../WhitelistItemChainsSelector';

export interface UseEditSmartContractSidebarPropsParams {
  address: string;
  smartContractsCount: number;
  isOpened: boolean;
  onClose: () => void;
  setWhitelistContent: () => void;
  whitelist: WhitelistItem[];
}

const type = UserEndpointTokenMode.ADDRESS;

export const useEditSmartContractSidebarProps = ({
  address,
  isOpened,
  onClose,
  setWhitelistContent,
  smartContractsCount,
  whitelist,
}: UseEditSmartContractSidebarPropsParams) => {
  const validate = useValidator({
    currentValue: address,
    type,
    validate: validateSmartContractAddress,
  });

  const initiallySelectedBlockchains = useInitiallySelectedBlockchains({
    value: address,
    whitelist,
  });

  const {
    error,
    isValid: isAddressValid,
    onChange,
    reset: resetInputState,
    value,
  } = useWhitelistItemInput({ validate, value: address });

  const {
    handleSelectBlockchain,
    reset: resetSelectorState,
    selectedBlockchains,
    subchains,
    isValid: isSelectorValid,
  } = useWhitelistItemChainsSelector(initiallySelectedBlockchains);

  const reset = useCallback(() => {
    resetInputState();
    setWhitelistContent();
    resetSelectorState();
  }, [resetInputState, resetSelectorState, setWhitelistContent]);

  const { handleEditWhitelistItems, isEditing } = useEditWhitelistItemsHandler({
    blockchains: selectedBlockchains,
    initialValue: address,
    initiallySelectedBlockchains,
    onSuccess: reset,
    type,
    value,
    whitelist,
  });

  const sidebarProps = useMemo((): ProjectSidebarProps => {
    const hasSelectedBlockchains = selectedBlockchains.length > 0;
    const hasValue = Boolean(value);

    const isConfirmationDisabled =
      !hasSelectedBlockchains ||
      !hasValue ||
      !isAddressValid ||
      !isSelectorValid;

    return {
      children: (
        <EditSmartContractForm
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
      isConfirming: isEditing,
      isOpened,
      onBackButtonClick: reset,
      onCancelButtonClick: reset,
      onClose: () => {
        onClose();
        reset();
      },
      onConfirmButtonClick: handleEditWhitelistItems,
    };
  }, [
    error,
    handleEditWhitelistItems,
    handleSelectBlockchain,
    isAddressValid,
    isEditing,
    isOpened,
    isSelectorValid,
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
