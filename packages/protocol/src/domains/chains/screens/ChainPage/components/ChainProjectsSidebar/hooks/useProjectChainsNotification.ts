import { useCallback } from 'react';
import { Chain, ChainPath } from '@ankr.com/chains-list';

import { Locale } from 'modules/i18n';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { Project } from 'domains/projects/utils/getAllProjects';
import { truncateString } from 'modules/common/utils/truncateString';

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
  const { keys, t } = useTranslation(projectsChainsConfirmTranslation);

  const getNotificationMessage = useCallback(
    (changedProjects: Project[]) => {
      if (changedProjects.length > 1) {
        const isChainAddedToSeveralProjects = changedProjects.every(project =>
          selectedSubchains[project.userEndpointToken].some(
            path => !project.blockchains?.includes(path),
          ),
        );

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

        const isSubchainRemoved = changedProjects.some(project =>
          project.blockchains?.some(
            path =>
              !selectedSubchains[project.userEndpointToken].includes(path),
          ),
        );

        if (isChainAddedToSeveralProjects && !isSubchainRemoved) {
          return t(keys.addedToProjects, { chainName: chain.name });
        }

        const projectNames = changedProjects
          .map(project => truncateString(project.name, MAX_PROJECT_NAME_LENGTH))
          .join(', ');

        return t(keys.projectsEdited, { projectsNames: projectNames });
      }

      const project = changedProjects[0];
      const newChainPaths = selectedSubchains[project.userEndpointToken];
      const isChainAdded = newChainPaths.some(
        path => !project.blockchains?.includes(path),
      );
      const isChainRemoved = project.blockchains?.some(
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
    [selectedSubchains, allCurrentChainPaths, t, keys, chain],
  );

  return {
    getNotificationMessage,
  };
};
