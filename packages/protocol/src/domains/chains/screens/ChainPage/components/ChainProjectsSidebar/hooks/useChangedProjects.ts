import { useCallback } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { Project } from 'domains/projects/utils/getAllProjects';
import { useAddBlockchainsToWhitelistMutation } from 'domains/projects/actions/addBlockchainsToWhitelist';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useAppSelector } from 'store/useAppSelector';
import { selectAllChainsPaths } from 'modules/chains/store/selectors';

export interface IUseChangedProjectsProps {
  allCurrentChainPaths: ChainPath[];
  allPathsExceptCurrentChain: ChainPath[];
  allProjects: Project[];
  selectedSubchains: Record<string, string[]>;
}

export const useChangedProjects = ({
  allCurrentChainPaths,
  allPathsExceptCurrentChain,
  allProjects,
  selectedSubchains,
}: IUseChangedProjectsProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const allChainsPaths = useAppSelector(selectAllChainsPaths);

  const [addBlockchains, { isLoading: isLoadingAddChainsToProject }] =
    useAddBlockchainsToWhitelistMutation();

  const hasChanges = useCallback(
    (project: Project) => {
      const newSubchains = selectedSubchains[project.userEndpointToken];
      const currentChains = project.blockchains || [];
      const hasNewSubchains = newSubchains.some(
        path => !currentChains.includes(path),
      );
      const hasRemovedSubchains = currentChains.some(
        path => !newSubchains.includes(path),
      );

      return hasNewSubchains || hasRemovedSubchains;
    },
    [selectedSubchains],
  );

  const getChangedProjects = useCallback(async () => {
    const changedProjects: Project[] = [];

    await Promise.all(
      allProjects.map(async project => {
        if (!hasChanges(project)) return;

        changedProjects.push(project);

        const newChainPaths = selectedSubchains[project.userEndpointToken];
        const isSelected = allCurrentChainPaths.every(path =>
          newChainPaths.includes(path),
        );
        const areAllChainsSelected =
          newChainPaths.length === allChainsPaths.length;

        let blockchains = newChainPaths;

        if (project.blockchains?.length === 0 && !isSelected) {
          blockchains = allPathsExceptCurrentChain;
        }

        await addBlockchains({
          params: {
            blockchains: areAllChainsSelected ? [] : blockchains,
            group,
            userEndpointToken: project.userEndpointToken,
          },
        });
      }),
    );

    return changedProjects;
  }, [
    allProjects,
    hasChanges,
    selectedSubchains,
    allCurrentChainPaths,
    allChainsPaths.length,
    addBlockchains,
    group,
    allPathsExceptCurrentChain,
  ]);

  return { hasChanges, getChangedProjects, isLoadingAddChainsToProject };
};
