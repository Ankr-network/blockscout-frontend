import { ChangeEvent, useCallback } from 'react';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { ISelectOption } from 'uiKit/Select';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { ChainStepFields } from 'domains/projects/store';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';

import { useAvailableIds } from './useAvailableIds';

export interface ITypeSelectorProps extends SelectMenuProps {
  chainId: ChainID;
  chainTypes: ISelectOption[];
  endpoints: GroupedEndpoints;
  beaconsMainnet?: Chain[];
  beaconsTestnet?: Chain[];
  opnodesMainnet?: Chain[];
  opnodesTestnet?: Chain[];
}

// eslint-disable-next-line max-lines-per-function
export const useAllChainsSelection = ({
  endpoints,
}: Omit<ITypeSelectorProps, 'chainTypes'>) => {
  const {
    onChange: onFormChange,
    selectedBeaconMainnetIds,
    selectedBeaconTestnetIds,
    selectedDevnetIds,
    selectedMainnetIds,
    selectedOpnodeMainnetIds,
    selectedOpnodeTestnetIds,
    selectedTestnetIds,
  } = useProjectFormValues();

  const {
    allAvailableBeaconMainnetIds,
    allAvailableBeaconTestnetIds,
    allAvailableDevnetIds,
    allAvailableMainnetIds,
    allAvailableOpnodeMainnetIds,
    allAvailableOpnodeTestnetIds,
    allAvailableTestnetIds,
    areAllAvailableChainsSelected,
    hasCurrentChainSelectedIds,
  } = useAvailableIds(endpoints);

  const handleSelectAll = useCallback(() => {
    const newMainnetIds = [
      ...new Set([...selectedMainnetIds, ...allAvailableMainnetIds]),
    ];
    const newTestnetIds = [
      ...new Set([...selectedTestnetIds, ...allAvailableTestnetIds]),
    ];
    const newDevnetIds = [
      ...new Set([...selectedDevnetIds, ...allAvailableDevnetIds]),
    ];
    const newBeaconMainnetIds = [
      ...new Set([
        ...selectedBeaconMainnetIds,
        ...allAvailableBeaconMainnetIds,
      ]),
    ];
    const newBeaconTestnetIds = [
      ...new Set([
        ...selectedBeaconTestnetIds,
        ...allAvailableBeaconTestnetIds,
      ]),
    ];
    const newOpnodeMainnetIds = [
      ...new Set([
        ...selectedOpnodeMainnetIds,
        ...allAvailableOpnodeMainnetIds,
      ]),
    ];
    const newOpnodeTestnetIds = [
      ...new Set([
        ...selectedOpnodeTestnetIds,
        ...allAvailableOpnodeTestnetIds,
      ]),
    ];

    onFormChange(ChainStepFields.selectedMainnetIds, newMainnetIds);
    onFormChange(ChainStepFields.selectedTestnetIds, newTestnetIds);
    onFormChange(ChainStepFields.selectedDevnetIds, newDevnetIds);
    onFormChange(ChainStepFields.selectedBeaconMainnetIds, newBeaconMainnetIds);
    onFormChange(ChainStepFields.selectedBeaconTestnetIds, newBeaconTestnetIds);
    onFormChange(ChainStepFields.selectedOpnodeMainnetIds, newOpnodeMainnetIds);
    onFormChange(ChainStepFields.selectedOpnodeTestnetIds, newOpnodeTestnetIds);
  }, [
    allAvailableDevnetIds,
    allAvailableMainnetIds,
    allAvailableTestnetIds,
    allAvailableBeaconMainnetIds,
    allAvailableBeaconTestnetIds,
    allAvailableOpnodeMainnetIds,
    allAvailableOpnodeTestnetIds,
    onFormChange,
    selectedDevnetIds,
    selectedMainnetIds,
    selectedTestnetIds,
    selectedBeaconMainnetIds,
    selectedBeaconTestnetIds,
    selectedOpnodeMainnetIds,
    selectedOpnodeTestnetIds,
  ]);

  const handleUnselectAll = useCallback(() => {
    onFormChange(
      ChainStepFields.selectedMainnetIds,
      selectedMainnetIds.filter(
        (id: ChainID) => !allAvailableMainnetIds.includes(id),
      ),
    );
    onFormChange(
      ChainStepFields.selectedTestnetIds,
      selectedTestnetIds.filter(
        (id: ChainID) => !allAvailableTestnetIds.includes(id),
      ),
    );
    onFormChange(
      ChainStepFields.selectedDevnetIds,
      selectedDevnetIds.filter(
        (id: ChainID) => !allAvailableDevnetIds.includes(id),
      ),
    );
    onFormChange(
      ChainStepFields.selectedBeaconMainnetIds,
      selectedBeaconMainnetIds.filter(
        (id: ChainID) => !allAvailableBeaconMainnetIds.includes(id),
      ),
    );
    onFormChange(
      ChainStepFields.selectedBeaconTestnetIds,
      selectedBeaconTestnetIds.filter(
        (id: ChainID) => !allAvailableBeaconTestnetIds.includes(id),
      ),
    );
    onFormChange(
      ChainStepFields.selectedOpnodeMainnetIds,
      selectedOpnodeMainnetIds.filter(
        (id: ChainID) => !allAvailableOpnodeMainnetIds.includes(id),
      ),
    );
    onFormChange(
      ChainStepFields.selectedOpnodeTestnetIds,
      selectedOpnodeTestnetIds.filter(
        (id: ChainID) => !allAvailableOpnodeTestnetIds.includes(id),
      ),
    );
  }, [
    allAvailableDevnetIds,
    allAvailableMainnetIds,
    allAvailableTestnetIds,
    allAvailableBeaconMainnetIds,
    allAvailableBeaconTestnetIds,
    allAvailableOpnodeMainnetIds,
    allAvailableOpnodeTestnetIds,
    onFormChange,
    selectedDevnetIds,
    selectedMainnetIds,
    selectedTestnetIds,
    selectedBeaconMainnetIds,
    selectedBeaconTestnetIds,
    selectedOpnodeMainnetIds,
    selectedOpnodeTestnetIds,
  ]);

  const handleChangeAll = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        handleSelectAll();
      } else {
        handleUnselectAll();
      }
    },
    [handleSelectAll, handleUnselectAll],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      handleChangeAll(event.target.checked),
    [handleChangeAll],
  );

  return {
    onChange,
    handleSelectAll,
    handleUnselectAll,
    isChecked: areAllAvailableChainsSelected,
    isIndeterminate:
      hasCurrentChainSelectedIds && !areAllAvailableChainsSelected,
  };
};
