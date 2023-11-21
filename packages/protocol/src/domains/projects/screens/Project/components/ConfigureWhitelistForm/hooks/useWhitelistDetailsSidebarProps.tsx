import { useMemo } from 'react';

import { ProjectSidebarProps } from 'domains/projects/screens/Project/components/ProjectSidebar';
import {
  WhitelistDetails,
  WhitelistDetailsProps,
} from 'domains/projects/screens/Project/components/WhitelistDetails';
import { useWhitelistCounts } from 'domains/projects/screens/Project/hooks/useWhitelistCounts';

import { useWhitelistType } from './useWhitelistType';
import { useContentType } from './useContentType';

type ContentTypeMethods = Pick<
  ReturnType<typeof useContentType>,
  'setAddDomainContent' | 'setAddIPContent' | 'setAddSmartContractContent'
>;

type WhitelistCounts = Omit<
  ReturnType<typeof useWhitelistCounts>,
  | 'isLoading'
  | 'isDomainsListFull'
  | 'isIPsListFull'
  | 'isSmartContractsListFull'
>;

export interface UseWhitelistDetailsSidebarPropsParams
  extends ContentTypeMethods,
    WhitelistCounts {
  handleEditSidebarOpening: (value: string) => void;
  isOpened: boolean;
  onClose: () => void;
}

export const useWhitelistDetailsSidebarProps = ({
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
}: UseWhitelistDetailsSidebarPropsParams) => {
  const { selectedWhitelistTypeTab, whitelistType, whitelistTypeTabs } =
    useWhitelistType();

  const whitelistDetailsProps = useMemo(
    (): WhitelistDetailsProps => ({
      domainsCount,
      handleEditSidebarOpening,
      ipsCount,
      selectedWhitelistTypeTab,
      setAddDomainContent,
      setAddIPContent,
      setAddSmartContractContent,
      smartContractsCount,
      whitelist,
      whitelistType,
      whitelistTypeTabs,
    }),
    [
      domainsCount,
      handleEditSidebarOpening,
      ipsCount,
      selectedWhitelistTypeTab,
      setAddDomainContent,
      setAddIPContent,
      setAddSmartContractContent,
      smartContractsCount,
      whitelist,
      whitelistType,
      whitelistTypeTabs,
    ],
  );

  const sidebarProps = useMemo(
    (): ProjectSidebarProps => ({
      children: <WhitelistDetails {...whitelistDetailsProps} />,
      isOpened,
      onClose,
    }),
    [isOpened, onClose, whitelistDetailsProps],
  );

  return sidebarProps;
};
