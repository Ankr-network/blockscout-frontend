import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { AddDomainForm } from 'domains/projects/screens/Project/components/AddDomainForm';
import { ProjectSidebarProps } from 'domains/projects/screens/Project/components/ProjectSidebar';
import { useWhitelistItemInput } from 'domains/projects/screens/Project/components/WhitelistItemInput';
import { validateDomain } from 'modules/common/utils/validateDomain';

import { useAddWhitelistItemHandler } from './useAddWhitelistItemHandler';
import { useValidator } from './useValidator';
import { useWhitelistItemChainsSelector } from '../../WhitelistItemChainsSelector';

export interface UseAddDomainSidebarPropsParams {
  domainsCount: number;
  isDomainsListFull: boolean;
  isOpened: boolean;
  onClose: () => void;
  setWhitelistContent: () => void;
  whitelist: WhitelistItem[];
}

const type = UserEndpointTokenMode.REFERER;

export const useAddDomainSidebarProps = ({
  domainsCount,
  isDomainsListFull,
  isOpened,
  onClose,
  setWhitelistContent,
  whitelist,
}: UseAddDomainSidebarPropsParams) => {
  const validate = useValidator({ type, validate: validateDomain });

  const {
    error,
    isValid: isDomainValid,
    onChange,
    reset: resetInputState,
    value,
  } = useWhitelistItemInput({ validate });

  const {
    handleSelectBlockchain,
    reset: resetSelectorState,
    selectedBlockchains,
    subchains,
    isValid: isSelectorValid,
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
      !isDomainValid ||
      !isSelectorValid ||
      isDomainsListFull;

    return {
      children: (
        <AddDomainForm
          domain={value}
          domainsCount={domainsCount}
          handleSelectBlockchain={handleSelectBlockchain}
          inputError={error}
          isDomainValid={isDomainValid}
          isSelectorValid={isSelectorValid}
          onDomainChange={onChange}
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
    domainsCount,
    error,
    handleAddItemToProjectWhitelists,
    handleSelectBlockchain,
    isAdding,
    isDomainValid,
    isDomainsListFull,
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
