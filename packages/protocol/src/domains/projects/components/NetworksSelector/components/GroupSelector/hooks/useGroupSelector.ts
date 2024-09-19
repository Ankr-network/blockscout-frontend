import { useCallback, useMemo } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';
import { useAppSelector } from 'store/useAppSelector';
import { selectChainPathsByIds } from 'modules/chains/store/selectors';

export interface UseGroupSelectorParams {
  group: EndpointGroup;
  handleUpdateNetworksPaths: (paths: ChainPath[]) => void;
  selectedSubchainPaths: ChainPath[];
}

export const useGroupSelector = ({
  group: { chains },
  handleUpdateNetworksPaths,
  selectedSubchainPaths,
}: UseGroupSelectorParams) => {
  const allGroupIds = useMemo(() => chains.map(chain => chain.id), [chains]);

  const allGroupPaths = useAppSelector(state =>
    selectChainPathsByIds(state, allGroupIds),
  );

  const isSelected = useMemo(
    () => allGroupPaths.every(path => selectedSubchainPaths.includes(path)),
    [allGroupPaths, selectedSubchainPaths],
  );

  const onChange = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        handleUpdateNetworksPaths(allGroupPaths);
      } else {
        handleUpdateNetworksPaths(allGroupPaths);
      }
    },
    [allGroupPaths, handleUpdateNetworksPaths],
  );

  return { isSelected, onChange };
};
