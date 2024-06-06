import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { AddIPForm } from 'domains/projects/screens/Project/components/AddIPForm';
import { ProjectSidebarProps } from 'domains/projects/screens/Project/components/ProjectSidebar';
import { useWhitelistItemInput } from 'domains/projects/screens/Project/components/WhitelistItemInput';
import { validateIp } from 'modules/common/utils/validateIp';

import { useAddWhitelistItemHandler } from './useAddWhitelistItemHandler';
import { useValidator } from './useValidator';
import { useWhitelistItemChainsSelector } from '../../WhitelistItemChainsSelector';

export interface UseAddIPSidebarPropsParams {
  ipsCount: number;
  isIPsListFull: boolean;
  isOpened: boolean;
  onClose: () => void;
  setWhitelistContent: () => void;
  whitelist: WhitelistItem[];
}

const type = UserEndpointTokenMode.IP;

export const useAddIPSidebarProps = ({
  ipsCount,
  isIPsListFull,
  isOpened,
  onClose,
  setWhitelistContent,
  whitelist,
}: UseAddIPSidebarPropsParams) => {
  const validate = useValidator({ type, validate: validateIp });

  const {
    error,
    isValid: isIPValid,
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
      !isIPValid ||
      !isSelectorValid ||
      isIPsListFull;

    return {
      children: (
        <AddIPForm
          ip={value}
          ipsCount={ipsCount}
          handleSelectBlockchain={handleSelectBlockchain}
          inputError={error}
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
    ipsCount,
    isAdding,
    isIPValid,
    isIPsListFull,
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
