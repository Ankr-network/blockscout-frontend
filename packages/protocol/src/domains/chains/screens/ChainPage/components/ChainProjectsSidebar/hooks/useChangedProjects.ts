import { useCallback } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { selectAllChainsPaths } from 'modules/chains/store/selectors';
import { useAddBlockchainsToWhitelistMutation } from 'domains/projects/actions/addBlockchainsToWhitelist';
import { useAppSelector } from 'store/useAppSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { useProjectsWhitelistsBlockchains } from 'domains/projects/hooks/useProjectsWhitelistsBlockchains';

export interface IUseChangedProjectsProps {
  allCurrentChainPaths: ChainPath[];
  allPathsExceptCurrentChain: ChainPath[];
  selectedSubchains: Record<string, string[]>;
}

export const useChangedProjects = ({
  allCurrentChainPaths,
  allPathsExceptCurrentChain,
  selectedSubchains,
}: IUseChangedProjectsProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { jwts: projects } = useJWTsManager();
  const { projectsWhitelistsBlockchains } = useProjectsWhitelistsBlockchains({
    projects,
    group,
    skipFetching: true,
  });

  const allChainsPaths = useAppSelector(selectAllChainsPaths);

  const [addBlockchains, { isLoading: isLoadingAddChainsToProject }] =
    useAddBlockchainsToWhitelistMutation();

  const hasChanges = useCallback(
    (project: JWT) => {
      const currentChains =
        projectsWhitelistsBlockchains.find(
          ({ userEndpointToken }) =>
            userEndpointToken === project.userEndpointToken,
        )?.blockchains ?? [];

      const newSubchains = selectedSubchains[project.userEndpointToken];
      const hasNewSubchains = newSubchains.some(
        path => !currentChains.includes(path),
      );
      const hasRemovedSubchains = currentChains.some(
        path => !newSubchains.includes(path),
      );

      return hasNewSubchains || hasRemovedSubchains;
    },
    [projectsWhitelistsBlockchains, selectedSubchains],
  );

  const getChangedProjects = useCallback(async () => {
    const changedProjects: JWT[] = [];

    await Promise.all(
      projects.map(async project => {
        if (!hasChanges(project)) return;

        changedProjects.push(project);

        const projectBlockchains =
          projectsWhitelistsBlockchains.find(
            ({ userEndpointToken }) =>
              userEndpointToken === project.userEndpointToken,
          )?.blockchains ?? [];

        const newChainPaths = selectedSubchains[project.userEndpointToken];
        const isSelected = allCurrentChainPaths.every(path =>
          newChainPaths.includes(path),
        );
        const areAllChainsSelected =
          newChainPaths.length === allChainsPaths.length;

        let blockchains = newChainPaths;

        if (projectBlockchains.length === 0 && !isSelected) {
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
    addBlockchains,
    allChainsPaths.length,
    allCurrentChainPaths,
    allPathsExceptCurrentChain,
    group,
    hasChanges,
    projects,
    projectsWhitelistsBlockchains,
    selectedSubchains,
  ]);

  return { hasChanges, getChangedProjects, isLoadingAddChainsToProject };
};
