import { useCallback, useMemo, useState } from 'react';
import { Chain } from '@ankr.com/chains-list';

import { useAppSelector } from 'store/useAppSelector';
import { selectAllProjects } from 'domains/projects/store/WhitelistsSelector';
import { useAddBlockchainsToWhitelistMutation } from 'domains/projects/actions/addBlockchainsToWhitelist';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import {
  selectAllChainsPaths,
  selectAllPathsByChainId,
} from 'modules/chains/store/selectors';

interface IUseChainProjectsDialogProps {
  chain: Chain;
  onCloseAddToProjectsDialog: () => void;
}

// eslint-disable-next-line max-lines-per-function
export const useChainProjectsDialog = ({
  chain,
  onCloseAddToProjectsDialog,
}: IUseChainProjectsDialogProps) => {
  const allProjects = useAppSelector(selectAllProjects);

  const chainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, chain.id),
  );

  const allPaths = useAppSelector(selectAllChainsPaths);

  const allPathsExceptCurrentChain = useMemo(() => {
    return allPaths.filter(path => !chainPaths.includes(path));
  }, [allPaths, chainPaths]);

  const initiallySelectedProjects = useMemo(() => {
    return allProjects
      .filter(project => {
        const currentProjectChains = project.blockchains;

        if (currentProjectChains?.length === 0) {
          return true;
        }

        return chainPaths.some(path => currentProjectChains?.includes(path));
      })
      .map(project => project?.userEndpointToken);
  }, [allProjects, chainPaths]);

  const [selectedProjects, setSelectedProjects] = useState(
    initiallySelectedProjects,
  );

  const isAllSelected = allProjects.every(project =>
    selectedProjects.includes(project.userEndpointToken),
  );

  const handleSelectAll = useCallback(() => {
    setSelectedProjects(allProjects.map(project => project.userEndpointToken));
  }, [allProjects]);

  const handleUnselectAll = useCallback(() => {
    setSelectedProjects([]);
  }, []);

  const handleProjectChange = useCallback(
    (projectToken: string) => {
      if (selectedProjects.includes(projectToken)) {
        setSelectedProjects(
          selectedProjects.filter(token => token !== projectToken),
        );
      } else {
        setSelectedProjects([...selectedProjects, projectToken]);
      }
    },
    [selectedProjects],
  );

  const handleAllChange = useCallback(() => {
    if (isAllSelected) {
      handleUnselectAll();
    } else {
      handleSelectAll();
    }
  }, [isAllSelected, handleSelectAll, handleUnselectAll]);

  const [addBlockchains, { isLoading: isLoadingAddChainsToProject }] =
    useAddBlockchainsToWhitelistMutation();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const onConfirm = useCallback(async () => {
    const hasChanges =
      initiallySelectedProjects.some(
        projectToken => !selectedProjects.includes(projectToken),
      ) ||
      selectedProjects.some(
        projectToken => !initiallySelectedProjects.includes(projectToken),
      );

    if (!hasChanges) {
      onCloseAddToProjectsDialog();

      return;
    }

    allProjects.forEach(project => {
      const isProjectSelected = selectedProjects.includes(
        project.userEndpointToken,
      );

      const isProjectInitiallySelected = initiallySelectedProjects.includes(
        project.userEndpointToken,
      );

      const isChanged = isProjectSelected !== isProjectInitiallySelected;

      if (!isChanged) {
        return;
      }

      const isSelected = selectedProjects.includes(project.userEndpointToken);

      const { blockchains: currentProjectChains = [], userEndpointToken } =
        project;

      let blockchains = isSelected
        ? [...currentProjectChains, ...chainPaths]
        : currentProjectChains.filter(id => !chainPaths.includes(id));

      if (currentProjectChains.length === 0 && !isSelected) {
        blockchains = allPathsExceptCurrentChain;
      }

      addBlockchains({
        params: {
          blockchains,
          group,
          userEndpointToken,
        },
      }).then(onCloseAddToProjectsDialog);
    });
  }, [
    selectedProjects,
    initiallySelectedProjects,
    allProjects,
    chainPaths,
    addBlockchains,
    group,
    onCloseAddToProjectsDialog,
    allPathsExceptCurrentChain,
  ]);

  return {
    isAllSelected,
    handleAllChange,
    allProjects,
    selectedProjects,
    handleProjectChange,
    onConfirm,
    isLoadingAddChainsToProject,
  };
};
