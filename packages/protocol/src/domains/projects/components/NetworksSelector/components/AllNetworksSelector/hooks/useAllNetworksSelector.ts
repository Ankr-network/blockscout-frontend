import { useCallback, useMemo } from 'react';
import { ChainPath } from '@ankr.com/chains-list';

export interface UseAllNetworksSelectorParams {
  allSubchainPaths: ChainPath[];
  handleSelectAllSubchains: () => void;
  handleUnselectAllSubchains: () => void;
  selectedSubchainPaths: ChainPath[];
}

export const useAllNetworksSelector = ({
  allSubchainPaths,
  handleSelectAllSubchains,
  handleUnselectAllSubchains,
  selectedSubchainPaths,
}: UseAllNetworksSelectorParams) => {
  const isSelected = useMemo(
    () => allSubchainPaths.every(path => selectedSubchainPaths.includes(path)),
    [allSubchainPaths, selectedSubchainPaths],
  );

  const isIndeterminate = !isSelected && selectedSubchainPaths.length > 0;

  const onChange = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        handleSelectAllSubchains();
      } else {
        handleUnselectAllSubchains();
      }
    },
    [handleSelectAllSubchains, handleUnselectAllSubchains],
  );

  return { isIndeterminate, isSelected, onChange };
};
