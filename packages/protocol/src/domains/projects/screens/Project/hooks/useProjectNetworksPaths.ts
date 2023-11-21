import { useMemo } from 'react';

import { selectAllPathsByChainId } from 'modules/chains/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

import { useAddChainsToProjectHandler } from './useAddChainsToProjectHandler';
import { useProjectChainsContext } from './useProjectChainsContext';
import { useSelectedNetworksPaths } from './useSelectedNetworksPaths';

export interface UseProjectChainPathsParams {
  onAddChainsSuccess: () => void;
}

export const useProjectNetworksPaths = ({
  onAddChainsSuccess,
}: UseProjectChainPathsParams) => {
  const { paths: projectChainsPaths, selectedProjectChainsTabId } =
    useProjectChainsContext();

  const allCurrentChainPaths = useAppSelector(state =>
    selectAllPathsByChainId(state, selectedProjectChainsTabId!),
  );

  const {
    handleResetNetworksSelection,
    handleUpdateNetworksPaths,
    selectedNetworksPaths,
  } = useSelectedNetworksPaths({ allCurrentChainPaths });

  const projectSelectedPathsWithoutCurrentChainPaths = useMemo(() => {
    return projectChainsPaths.filter(
      path => !allCurrentChainPaths.includes(path),
    );
  }, [allCurrentChainPaths, projectChainsPaths]);

  const newSelectedProjectChainsPaths = useMemo(() => {
    return [
      ...selectedNetworksPaths,
      ...projectSelectedPathsWithoutCurrentChainPaths,
    ];
  }, [projectSelectedPathsWithoutCurrentChainPaths, selectedNetworksPaths]);

  const { handleAddChainsToProject, isAddingChainsToProject } =
    useAddChainsToProjectHandler({
      onAddChainsSuccess,
      selectedProjectChainsPaths: newSelectedProjectChainsPaths,
    });

  return {
    handleAddChainsToProject,
    handleResetNetworksSelection,
    handleUpdateNetworksPaths,
    isAddingChainsToProject,
    selectedNetworksPaths,
  };
};
