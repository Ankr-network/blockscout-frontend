import { Chain, ChainPath } from '@ankr.com/chains-list';
import { useCallback } from 'react';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { Locale } from 'modules/i18n';
import { truncateString } from 'modules/common/utils/truncateString';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';
import { useProjectsWhitelistsBlockchains } from 'domains/projects/hooks/useProjectsWhitelistsBlockchains';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { IProjectSubchains } from './useProjectSubchains';

const projectsChainsConfirmTranslation = {
  [Locale.en]: {
    projectEdited: "{projectName} project's chains edited",
    projectsEdited: "{projectsNames} projects' chains edited",
    addedToProject: '{chainName} added to project',
    addedToProjects: '{chainName} added to projects',
    removedFromProject: '{chainName} removed from project',
    removedFromProjects: '{chainName} removed from projects',
  },
};

export const MAX_PROJECT_NAME_LENGTH = 15;

export interface IUseProjectChainsConfirmUtilsProps {
  allCurrentChainPaths: ChainPath[];
  selectedSubchains: IProjectSubchains;
  chain: Chain;
}

export const useProjectChainsNotification = ({
  allCurrentChainPaths,
  chain,
  selectedSubchains,
}: IUseProjectChainsConfirmUtilsProps) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { jwts: projects } = useJWTsManager();
  const { projectsWhitelistsBlockchains } = useProjectsWhitelistsBlockchains({
    projects,
    group,
    skipFetching: true,
  });

  const { keys, t } = useTranslation(projectsChainsConfirmTranslation);

  const getNotificationMessage = useCallback(
    (changedProjects: JWT[]) => {
      if (changedProjects.length > 1) {
        const isChainAddedToSeveralProjects = changedProjects.every(project => {
          const projectBlockchains =
            projectsWhitelistsBlockchains.find(
              ({ userEndpointToken }) =>
                userEndpointToken === project.userEndpointToken,
            )?.blockchains ?? [];

          return selectedSubchains[project.userEndpointToken].some(
            path => !projectBlockchains.includes(path),
          );
        });

        const isChainFullyRemovedFromChangedProjects = changedProjects.every(
          project =>
            !allCurrentChainPaths.some(path =>
              selectedSubchains[project.userEndpointToken].includes(path),
            ),
        );

        if (
          isChainFullyRemovedFromChangedProjects &&
          !isChainAddedToSeveralProjects
        ) {
          return t(keys.removedFromProjects, { chainName: chain.name });
        }

        const isSubchainRemoved = changedProjects.some(project => {
          const projectBlockchains =
            projectsWhitelistsBlockchains.find(
              ({ userEndpointToken }) =>
                userEndpointToken === project.userEndpointToken,
            )?.blockchains ?? [];

          return projectBlockchains.some(
            path =>
              !selectedSubchains[project.userEndpointToken].includes(path),
          );
        });

        if (isChainAddedToSeveralProjects && !isSubchainRemoved) {
          return t(keys.addedToProjects, { chainName: chain.name });
        }

        const projectNames = changedProjects
          .map(project => truncateString(project.name, MAX_PROJECT_NAME_LENGTH))
          .join(', ');

        return t(keys.projectsEdited, { projectsNames: projectNames });
      }

      const project = changedProjects[0];
      const projectBlockchains =
        projectsWhitelistsBlockchains.find(
          ({ userEndpointToken }) =>
            userEndpointToken === project.userEndpointToken,
        )?.blockchains ?? [];

      const newChainPaths = selectedSubchains[project.userEndpointToken];
      const isChainAdded = newChainPaths.some(
        path => !projectBlockchains.includes(path),
      );

      const isChainRemoved = projectBlockchains.some(
        path => !newChainPaths.includes(path),
      );
      const isChainFullyRemoved = allCurrentChainPaths.every(
        path => !newChainPaths.includes(path),
      );

      if (isChainAdded && !isChainRemoved) {
        return t(keys.addedToProject, { chainName: chain.name });
      }

      if (isChainRemoved && isChainFullyRemoved) {
        return t(keys.removedFromProject, { chainName: chain.name });
      }

      return t(keys.projectEdited, {
        projectName: truncateString(project.name, MAX_PROJECT_NAME_LENGTH),
      });
    },
    [
      allCurrentChainPaths,
      chain,
      keys,
      projectsWhitelistsBlockchains,
      selectedSubchains,
      t,
    ],
  );

  return {
    getNotificationMessage,
  };
};
