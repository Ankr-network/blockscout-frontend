import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { EditIPForm } from 'domains/projects/screens/Project/components/EditIPForm';
import { ProjectSidebarProps } from 'domains/projects/screens/Project/components/ProjectSidebar';
import { useWhitelistItemInput } from 'domains/projects/screens/Project/components/WhitelistItemInput';
import { validateIp } from 'modules/common/utils/validateIp';

import { useEditWhitelistItemsHandler } from './useEditWhitelistItemsHandler';
import { useInitiallySelectedBlockchains } from './useInitiallySelectedBlockchains';
import { useValidator } from './useValidator';
import { useWhitelistItemChainsSelector } from '../../WhitelistItemChainsSelector';

export interface UseEditIPSidebarPropsParams {
  ip: string;
  ipsCount: number;
  isOpened: boolean;
  onClose: () => void;
  setWhitelistContent: () => void;
  whitelist: WhitelistItem[];
}

const type = UserEndpointTokenMode.IP;

export const useEditIPSidebarProps = ({
  ip,
  ipsCount,
  isOpened,
  onClose,
  setWhitelistContent,
  whitelist,
}: UseEditIPSidebarPropsParams) => {
  const validate = useValidator({
    currentValue: ip,
    type,
    validate: validateIp,
  });

  const initiallySelectedBlockchains = useInitiallySelectedBlockchains({
    value: ip,
    whitelist,
  });

  const {
    error,
    isValid: isIPValid,
    onChange,
    reset: resetInputState,
    value,
  } = useWhitelistItemInput({ validate, value: ip });

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
    initialValue: ip,
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
      !hasSelectedBlockchains || !hasValue || !isIPValid || !isSelectorValid;

    return {
      children: (
        <EditIPForm
          handleSelectBlockchain={handleSelectBlockchain}
          inputError={error}
          ip={value}
          ipsCount={ipsCount}
          isIPValid={isIPValid}
          isSelectorValid={isSelectorValid}
          onIPChange={onChange}
          selectedBlockchains={selectedBlockchains}
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
    ipsCount,
    isEditing,
    isIPValid,
    isOpened,
    isSelectorValid,
    onChange,
    onClose,
    reset,
    selectedBlockchains,
    subchains,
    value,
  ]);

  return sidebarProps;
};
