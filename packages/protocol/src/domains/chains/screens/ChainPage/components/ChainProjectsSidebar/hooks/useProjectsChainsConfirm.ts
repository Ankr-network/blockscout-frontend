import { useCallback } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { useAddBlockchainsToWhitelistMutation } from 'domains/projects/actions/addBlockchainsToWhitelist';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { Project } from 'domains/projects/utils/getAllProjects';

import { IProjectSubchains } from './useProjectSubchains';

interface IProjectsChainsConfirmProps {
  allCurrentChainPaths: ChainPath[];
  allPathsExceptCurrentChain: ChainPath[];
  allProjects: Project[];
  onCloseAddToProjectsSidebar: () => void;
  selectedSubchains: IProjectSubchains;
}

export const useProjectsChainsConfirm = ({
  allCurrentChainPaths,
  allPathsExceptCurrentChain,
  allProjects,
  onCloseAddToProjectsSidebar,
  selectedSubchains,
}: IProjectsChainsConfirmProps) => {
  const [addBlockchains, { isLoading: isLoadingAddChainsToProject }] =
    useAddBlockchainsToWhitelistMutation();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const onConfirm = useCallback(async () => {
    const hasChanges = allProjects.some(project => {
      const hasNewSubchains = selectedSubchains[project.userEndpointToken].some(
        path => !project.blockchains?.includes(path),
      );
      const hasRemovedSubchains = project.blockchains?.some(
        path => !selectedSubchains[project.userEndpointToken].includes(path),
      );

      return hasNewSubchains || hasRemovedSubchains;
    });

    if (!hasChanges) {
      onCloseAddToProjectsSidebar();

      return;
    }

    await Promise.all(
      allProjects.map(async project => {
        const { blockchains: currentProjectChains = [], userEndpointToken } =
          project;

        const newChainPaths = selectedSubchains[userEndpointToken];

        const isChanged =
          currentProjectChains.length !== newChainPaths.length ||
          currentProjectChains.some(path => !newChainPaths.includes(path)) ||
          newChainPaths.some(path => !currentProjectChains.includes(path));

        if (!isChanged) {
          return;
        }

        const isSelected = allCurrentChainPaths.every(path =>
          newChainPaths.includes(path),
        );

        let blockchains = newChainPaths;

        if (currentProjectChains.length === 0 && !isSelected) {
          blockchains = allPathsExceptCurrentChain;
        }

        await addBlockchains({
          params: {
            blockchains,
            group,
            userEndpointToken,
          },
        });
      }),
    );

    onCloseAddToProjectsSidebar();
  }, [
    allProjects,
    selectedSubchains,
    onCloseAddToProjectsSidebar,
    addBlockchains,
    group,
    allCurrentChainPaths,
    allPathsExceptCurrentChain,
  ]);

  return {
    isLoadingAddChainsToProject,
    onConfirm,
  };
};
