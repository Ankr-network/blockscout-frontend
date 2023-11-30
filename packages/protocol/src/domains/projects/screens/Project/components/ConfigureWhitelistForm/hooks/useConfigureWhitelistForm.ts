import { useWhitelistCounts } from 'domains/projects/screens/Project/hooks/useWhitelistCounts';

import { useAddDomainSidebarProps } from './useAddDomainSidebarProps';
import { useAddIPSidebarProps } from './useAddIPSidebarProps';
import { useAddSmartContractSidebarProps } from './useAddSmartContractSidebarProps';
import { useConfigureWhitelistSidebar } from './useConfigureWhitelistSidebar';
import { useContentType } from './useContentType';
import { useEditDomainSidebarProps } from './useEditDomainSidebarProps';
import { useEditIPSidebarProps } from './useEditIPSidebarProps';
import { useEditSmartContractSidebarProps } from './useEditSmartContractSidebarProps';
import { useEditWhitelistItemState } from './useEditWhitelistItemState';
import { useWhitelistDetailsSidebarProps } from './useWhitelistDetailsSidebarProps';

export interface UseConfigureWhitelistFormParams {
  isOpened: boolean;
  onClose: () => void;
}

export const useConfigureWhitelistForm = ({
  isOpened,
  onClose,
}: UseConfigureWhitelistFormParams) => {
  const {
    domainsCount,
    ipsCount,
    isDomainsListFull,
    isIPsListFull,
    isSmartContractsListFull,
    smartContractsCount,
    whitelist,
  } = useWhitelistCounts();

  const {
    contentType,
    setAddDomainContent,
    setAddIPContent,
    setAddSmartContractContent,
    setEditDomainContent,
    setEditIPContent,
    setEditSmartContractContent,
    setWhitelistContent,
  } = useContentType();

  const { editingValue, handleEditSidebarOpening } = useEditWhitelistItemState({
    setEditDomainContent,
    setEditIPContent,
    setEditSmartContractContent,
    whitelist,
  });

  const addDomainSidebarProps = useAddDomainSidebarProps({
    domainsCount,
    isDomainsListFull,
    isOpened,
    onClose,
    setWhitelistContent,
    whitelist,
  });

  const editDomainSidebarProps = useEditDomainSidebarProps({
    domain: editingValue,
    domainsCount,
    isOpened,
    onClose,
    setWhitelistContent,
    whitelist,
  });

  const addIPSidebarProps = useAddIPSidebarProps({
    ipsCount,
    isIPsListFull,
    isOpened,
    onClose,
    setWhitelistContent,
    whitelist,
  });

  const editIPSidebarProps = useEditIPSidebarProps({
    ip: editingValue,
    ipsCount,
    isOpened,
    onClose,
    setWhitelistContent,
    whitelist,
  });

  const addSmartContractSidebarProps = useAddSmartContractSidebarProps({
    isOpened,
    isSmartContractsListFull,
    onClose,
    setWhitelistContent,
    smartContractsCount,
    whitelist,
  });

  const editSmartContractSidebarProps = useEditSmartContractSidebarProps({
    address: editingValue,
    isOpened,
    onClose,
    setWhitelistContent,
    smartContractsCount,
    whitelist,
  });

  const whitelistDetailsSidebarProps = useWhitelistDetailsSidebarProps({
    domainsCount,
    handleEditSidebarOpening,
    ipsCount,
    isOpened,
    onClose,
    setAddDomainContent,
    setAddIPContent,
    setAddSmartContractContent,
    smartContractsCount,
    whitelist,
  });

  return useConfigureWhitelistSidebar({
    addDomainSidebarProps,
    addIPSidebarProps,
    addSmartContractSidebarProps,
    contentType,
    editDomainSidebarProps,
    editIPSidebarProps,
    editSmartContractSidebarProps,
    whitelistDetailsSidebarProps,
  });
};
