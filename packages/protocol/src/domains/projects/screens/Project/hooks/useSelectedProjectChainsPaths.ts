// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { getUniqueArray } from 'modules/common/utils/getUniqueArray';

import { useProjectChainsContext } from './useProjectChainsContext';

const selectPath = (selectedPaths: ChainPath[], path: ChainPath) =>
  getUniqueArray([...selectedPaths, path]);

const isUnSelected = (selectedPath: ChainPath, pathToUnselect: ChainPath) =>
  selectedPath !== pathToUnselect;

const unselectPath = (
  selectedPaths: ChainPath[],
  pathToUnselect: ChainPath,
  shouldHandleSubchains: boolean,
) => {
  return selectedPaths.filter(
    shouldHandleSubchains
      ? selectedPath =>
          !selectedPath.startsWith(pathToUnselect) ||
          selectedPath !== pathToUnselect
      : selectedPath => isUnSelected(selectedPath, pathToUnselect),
  );
};

const updateSelectedPathsByPath = (
  selectedPaths: ChainPath[],
  newPath: ChainPath,
  shouldHandleSubchains: boolean,
) =>
  selectedPaths.includes(newPath)
    ? unselectPath(selectedPaths, newPath, shouldHandleSubchains)
    : selectPath(selectedPaths, newPath);

const updateSelectedPathsByPaths = (
  selectedPaths: ChainPath[],
  newPaths: ChainPath[],
  shouldHandleSubchains: boolean,
) =>
  newPaths.reduce(
    (result, path) => {
      result = updateSelectedPathsByPath(result, path, shouldHandleSubchains);

      return result;
    },
    [...selectedPaths],
  );

export const updateSelectedPaths = (
  selectedPaths: ChainPath[],
  newPaths: ChainPath | ChainPath[],
  shouldHandleSubchains: boolean,
) => {
  if (Array.isArray(newPaths)) {
    return updateSelectedPathsByPaths(
      selectedPaths,
      newPaths,
      shouldHandleSubchains,
    );
  }

  const path = newPaths;

  return updateSelectedPathsByPath(selectedPaths, path, shouldHandleSubchains);
};

export interface UseSelectedProjectChainsPathsParams {
  // if true allows to unselect a chain with subchains too
  shouldHandleSubchains?: boolean;
}

export const useSelectedProjectChainsPaths = ({
  shouldHandleSubchains = true,
}: UseSelectedProjectChainsPathsParams | void = {}) => {
  const { paths: projectChainsPaths } = useProjectChainsContext();
  const [selectedProjectChainsPaths, setSelectedProjectChainsPaths] =
    useState<ChainPath[]>(projectChainsPaths);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  useEffect(() => {
    setSelectedProjectChainsPaths(projectChainsPaths);
  }, [projectChainsPaths]);

  const handleSelectProjectChainsPaths = useCallback(
    (newPaths: ChainPath | ChainPath[]) => {
      setSelectedProjectChainsPaths(selectedPaths =>
        updateSelectedPaths(selectedPaths, newPaths, shouldHandleSubchains),
      );
    },
    [shouldHandleSubchains],
  );

  const handleSelectAllSubchainPaths = useCallback(
    (pathsToSelect: ChainPath[]) => {
      setSelectedProjectChainsPaths(selectedPaths =>
        getUniqueArray([...selectedPaths, ...pathsToSelect]),
      );
    },
    [],
  );

  const handleUnselectAllSubchainPaths = useCallback(
    (pathsToUnselect: ChainPath[]) => {
      setSelectedProjectChainsPaths(selectedPaths =>
        selectedPaths.filter(path => !pathsToUnselect.includes(path)),
      );
    },
    [],
  );

  const handleResetProjectChainsSelection = useCallback(
    () => setSelectedProjectChainsPaths(projectChainsPaths),
    [projectChainsPaths],
  );

  return {
    handleResetProjectChainsSelection,
    handleSelectProjectChainsPaths,
    handleSelectAllSubchainPaths,
    handleUnselectAllSubchainPaths,
    setIsSelectedAll,
    isSelectedAll,
    selectedProjectChainsPaths,
  };
};
