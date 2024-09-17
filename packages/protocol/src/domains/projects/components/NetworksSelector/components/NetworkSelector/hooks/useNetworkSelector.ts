import { useCallback, useMemo } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';
import { useAppSelector } from 'store/useAppSelector';
import { selectChainPathsByIds } from 'modules/chains/store/selectors';

export interface UseNetworkSelectorParams {
  handleUpdateNetworksPaths: (paths: ChainPath[]) => void;
  networkGroups: EndpointGroup[];
  selectedSubchainPaths: ChainPath[];
}

export const useNetworkSelector = ({
  handleUpdateNetworksPaths,
  networkGroups,
  selectedSubchainPaths,
}: UseNetworkSelectorParams) => {
  const hasGroupsSelector = networkGroups.length > 1;

  const allNetworkIds = useMemo(
    () => networkGroups.flatMap(({ chains }) => chains.map(({ id }) => id)),
    [networkGroups],
  );

  const allNetworkPaths = useAppSelector(state =>
    selectChainPathsByIds(state, allNetworkIds),
  );

  const isNetworkSelected = useMemo(
    () => allNetworkPaths.every(path => selectedSubchainPaths.includes(path)),
    [allNetworkPaths, selectedSubchainPaths],
  );

  const isIndeterminate = useMemo(
    () =>
      !isNetworkSelected &&
      allNetworkPaths.some(id => selectedSubchainPaths.includes(id)),
    [isNetworkSelected, allNetworkPaths, selectedSubchainPaths],
  );

  const onChange = useCallback(() => {
    if (!isNetworkSelected) {
      return handleUpdateNetworksPaths(
        allNetworkPaths.filter(path => !selectedSubchainPaths.includes(path)),
      );
    }

    return handleUpdateNetworksPaths(allNetworkPaths);
  }, [
    isNetworkSelected,
    allNetworkPaths,
    selectedSubchainPaths,
    handleUpdateNetworksPaths,
  ]);

  return { hasGroupsSelector, isIndeterminate, isNetworkSelected, onChange };
};
