import { useCallback, useMemo } from 'react';
import { Chain, ChainPath } from '@ankr.com/chains-list';
import { UserEndpointToken } from 'multirpc-sdk';

import {
  selectAllPathsByChainId,
  selectAllPathsExceptSubchainsForChainId,
} from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { useProjectsWhitelistsBlockchains } from 'domains/projects/hooks/useProjectsWhitelistsBlockchains';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { IProjectSubchains } from './useProjectSubchains';
import { useProjectsChainsConfirm } from './useProjectsChainsConfirm';

interface IUseChainProjectsSidebarProps {
  chain: Chain;
  onCloseAddToProjectsSidebar: () => void;
  selectedSubchains: IProjectSubchains;
  setSelectedSubchains: (
    subchains: ChainPath[],
    projectToken: UserEndpointToken,
  ) => void;
  setExpandedId?: (expandedId: UserEndpointToken) => void;
}

// eslint-disable-next-line max-lines-per-function
export const useChainProjectsSidebar = ({
  chain,
  onCloseAddToProjectsSidebar,
  selectedSubchains,
  setExpandedId,
  setSelectedSubchains,
}: IUseChainProjectsSidebarProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { jwts: projects } = useJWTsManager();
  const { projectsWhitelistsBlockchains } = useProjectsWhitelistsBlockchains({
    projects,
    group,
    skipFetching: true,
  });

  const allCurrentChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const allPathsExceptCurrentChain = useAppSelector(state =>
    selectAllPathsExceptSubchainsForChainId(state, chain.id),
  );

  const isAllSelected = useMemo(
    () =>
      projects.every(({ userEndpointToken }) =>
        allCurrentChainPaths.every(path =>
          selectedSubchains[userEndpointToken]?.includes(path),
        ),
      ),
    [allCurrentChainPaths, projects, selectedSubchains],
  );

  const isAllIndeterminate = useMemo(
    () =>
      projects.some(({ userEndpointToken }) =>
        allCurrentChainPaths.some(path =>
          selectedSubchains[userEndpointToken]?.includes(path),
        ),
      ) && !isAllSelected,
    [allCurrentChainPaths, isAllSelected, projects, selectedSubchains],
  );

  const handleSelectAll = useCallback(() => {
    projects.forEach(project => {
      const projectBlockchains = projectsWhitelistsBlockchains.find(
        ({ userEndpointToken }) =>
          userEndpointToken === project.userEndpointToken,
      )?.blockchains;

      const newSelectedSubchains = [
        ...new Set([
          ...(projectBlockchains || allPathsExceptCurrentChain),
          ...allCurrentChainPaths,
        ]),
      ];

      setSelectedSubchains(newSelectedSubchains, project.userEndpointToken);
    });
  }, [
    projects,
    allCurrentChainPaths,
    allPathsExceptCurrentChain,
    projectsWhitelistsBlockchains,
    setSelectedSubchains,
  ]);

  const handleUnselectAll = useCallback(() => {
    projects.forEach(project => {
      const projectBlockchains = projectsWhitelistsBlockchains.find(
        ({ userEndpointToken }) =>
          userEndpointToken === project.userEndpointToken,
      )?.blockchains;

      const newSelectedSubchains =
        projectBlockchains?.filter(
          chainPath => !allCurrentChainPaths?.includes(chainPath),
        ) || allPathsExceptCurrentChain;

      setSelectedSubchains(newSelectedSubchains, project.userEndpointToken);
    });
  }, [
    allCurrentChainPaths,
    allPathsExceptCurrentChain,
    projects,
    projectsWhitelistsBlockchains,
    setSelectedSubchains,
  ]);

  const handleProjectChange = useCallback(
    (projectToken: UserEndpointToken) => {
      const currentProjectSelectedChains = selectedSubchains[projectToken];
      const areAllSubchainsSelected = allCurrentChainPaths?.every(path =>
        currentProjectSelectedChains.includes(path),
      );

      if (areAllSubchainsSelected) {
        const newSelectedSubchains = currentProjectSelectedChains.filter(
          chainPath => !allCurrentChainPaths?.includes(chainPath),
        );

        setSelectedSubchains(newSelectedSubchains, projectToken);
      } else {
        const newSelectedSubchains = [
          ...new Set([
            ...currentProjectSelectedChains,
            ...allCurrentChainPaths,
          ]),
        ];

        setExpandedId?.(projectToken);
        setSelectedSubchains(newSelectedSubchains, projectToken);
      }
    },
    [
      allCurrentChainPaths,
      selectedSubchains,
      setExpandedId,
      setSelectedSubchains,
    ],
  );

  const handleAllChange = useCallback(() => {
    if (isAllSelected) {
      handleUnselectAll();
    } else {
      handleSelectAll();
    }
  }, [isAllSelected, handleSelectAll, handleUnselectAll]);

  const { isLoadingAddChainsToProject, onConfirm } = useProjectsChainsConfirm({
    selectedSubchains,
    onCloseAddToProjectsSidebar,
    allCurrentChainPaths,
    allPathsExceptCurrentChain,
    chain,
  });

  return {
    isAllSelected,
    isAllIndeterminate,
    handleAllChange,
    handleProjectChange,
    onConfirm,
    isLoadingAddChainsToProject,
  };
};
