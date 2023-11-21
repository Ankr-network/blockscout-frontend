import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { EditDomainForm } from 'domains/projects/screens/Project/components/EditDomainForm';
import { ProjectSidebarProps } from 'domains/projects/screens/Project/components/ProjectSidebar';
import { useWhitelistItemInput } from 'domains/projects/screens/Project/components/WhitelistItemInput';
import { validateDomain } from 'modules/common/utils/validateDomain';

import { useEditWhitelistItemsHandler } from './useEditWhitelistItemsHandler';
import { useInitiallySelectedBlockchains } from './useInitiallySelectedBlockchains';
import { useValidator } from './useValidator';
import { useWhitelistItemChainsSelector } from '../../WhitelistItemChainsSelector';

export interface UseEditDomainSidebarPropsParams {
  domain: string;
  domainsCount: number;
  isOpened: boolean;
  onClose: () => void;
  setWhitelistContent: () => void;
  whitelist: WhitelistItem[];
}

const type = UserEndpointTokenMode.REFERER;

export const useEditDomainSidebarProps = ({
  domain,
  domainsCount,
  isOpened,
  onClose,
  setWhitelistContent,
  whitelist,
}: UseEditDomainSidebarPropsParams) => {
  const validate = useValidator({
    currentValue: domain,
    type,
    validate: validateDomain,
  });

  const initiallySelectedBlockchains = useInitiallySelectedBlockchains({
    value: domain,
    whitelist,
  });

  const {
    error,
    isValid: isDomainValid,
    onChange,
    reset: resetInputState,
    value,
  } = useWhitelistItemInput({ validate, value: domain });

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
    initialValue: domain,
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
      !isDomainValid ||
      !isSelectorValid;

    return {
      children: (
        <EditDomainForm
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
    domainsCount,
    error,
    handleEditWhitelistItems,
    handleSelectBlockchain,
    isDomainValid,
    isEditing,
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
