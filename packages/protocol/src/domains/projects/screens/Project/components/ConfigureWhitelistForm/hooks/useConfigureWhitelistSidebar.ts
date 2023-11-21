import { useMemo } from 'react';

import { ProjectSidebarProps } from 'domains/projects/screens/Project/components/ProjectSidebar';

import { ContentType } from '../constants';

export interface UseConfigureWhitelistSidebarParams {
  addDomainSidebarProps: ProjectSidebarProps;
  addIPSidebarProps: ProjectSidebarProps;
  addSmartContractSidebarProps: ProjectSidebarProps;
  contentType: ContentType;
  editDomainSidebarProps: ProjectSidebarProps;
  editIPSidebarProps: ProjectSidebarProps;
  editSmartContractSidebarProps: ProjectSidebarProps;
  whitelistDetailsSidebarProps: ProjectSidebarProps;
}

export const useConfigureWhitelistSidebar = ({
  addDomainSidebarProps,
  addIPSidebarProps,
  addSmartContractSidebarProps,
  contentType,
  editDomainSidebarProps,
  editIPSidebarProps,
  editSmartContractSidebarProps,
  whitelistDetailsSidebarProps,
}: UseConfigureWhitelistSidebarParams) =>
  useMemo(() => {
    const sidebarPropsMap: Record<ContentType, ProjectSidebarProps> = {
      [ContentType.AddDomain]: addDomainSidebarProps,
      [ContentType.AddIP]: addIPSidebarProps,
      [ContentType.AddSmartContract]: addSmartContractSidebarProps,
      [ContentType.EditDomain]: editDomainSidebarProps,
      [ContentType.EditIP]: editIPSidebarProps,
      [ContentType.EditSmartContract]: editSmartContractSidebarProps,
      [ContentType.Whitelist]: whitelistDetailsSidebarProps,
    };

    return sidebarPropsMap[contentType];
  }, [
    addDomainSidebarProps,
    addIPSidebarProps,
    addSmartContractSidebarProps,
    contentType,
    editDomainSidebarProps,
    editIPSidebarProps,
    editSmartContractSidebarProps,
    whitelistDetailsSidebarProps,
  ]);
