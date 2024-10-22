import { useCallback, useMemo } from 'react';
import { Chain, ChainPath } from '@ankr.com/chains-list';
import { UserEndpointToken } from 'multirpc-sdk';

import {
  selectAllPathsByChainId,
  selectAllPathsExceptSubchainsForChainId,
} from 'modules/chains/store/selectors';
import { selectAllProjects } from 'domains/projects/store/WhitelistsSelector';
import { useAppSelector } from 'store/useAppSelector';
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

export const useChainProjectsSidebar = ({
  chain,
  onCloseAddToProjectsSidebar,
  selectedSubchains,
  setExpandedId,
  setSelectedSubchains,
}: IUseChainProjectsSidebarProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const allProjects = useAppSelector(state =>
    selectAllProjects(state, { group }),
  );

  const allCurrentChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const allPathsExceptCurrentChain = useAppSelector(state =>
    selectAllPathsExceptSubchainsForChainId(state, chain.id),
  );

  const isAllSelected = useMemo(
    () =>
      allProjects.every(({ userEndpointToken }) =>
        allCurrentChainPaths.every(path =>
          selectedSubchains[userEndpointToken]?.includes(path),
        ),
      ),
    [allProjects, selectedSubchains, allCurrentChainPaths],
  );

  const isAllIndeterminate = useMemo(
    () =>
      allProjects.some(({ userEndpointToken }) =>
        allCurrentChainPaths.some(path =>
          selectedSubchains[userEndpointToken]?.includes(path),
        ),
      ) && !isAllSelected,
    [allProjects, selectedSubchains, allCurrentChainPaths, isAllSelected],
  );

  const handleSelectAll = useCallback(() => {
    allProjects.forEach(project => {
      const newSelectedSubchains = [
        ...new Set([
          ...(project.blockchains || allPathsExceptCurrentChain),
          ...allCurrentChainPaths,
        ]),
      ];

      setSelectedSubchains(newSelectedSubchains, project.userEndpointToken);
    });
  }, [
    allCurrentChainPaths,
    allPathsExceptCurrentChain,
    allProjects,
    setSelectedSubchains,
  ]);

  const handleUnselectAll = useCallback(() => {
    allProjects.forEach(project => {
      const newSelectedSubchains =
        project.blockchains?.filter(
          chainPath => !allCurrentChainPaths?.includes(chainPath),
        ) || allPathsExceptCurrentChain;

      setSelectedSubchains(newSelectedSubchains, project.userEndpointToken);
    });
  }, [
    allCurrentChainPaths,
    allPathsExceptCurrentChain,
    allProjects,
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
    allProjects,
    selectedSubchains,
    onCloseAddToProjectsSidebar,
    allCurrentChainPaths,
    allPathsExceptCurrentChain,
  });

  return {
    isAllSelected,
    isAllIndeterminate,
    handleAllChange,
    allProjects,
    handleProjectChange,
    onConfirm,
    isLoadingAddChainsToProject,
  };
};
