import { ChangeEvent, useCallback } from 'react';

import { ISelectOption } from 'uiKit/Select';
import { SelectMenuProps } from 'modules/common/components/ProjectSelect/ProjectSelect';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { ChainStepFields } from 'domains/projects/store';
import { ChainID } from 'domains/chains/types';
import { tendermintRpcChains } from 'modules/endpoints/constants/groups';

import { useProjectFormValues } from '../../../hooks/useProjectFormValues';

export interface ITypeSelectorProps extends SelectMenuProps {
  chainTypes: ISelectOption[];
  endpoints: GroupedEndpoints;
}

export const useAllChainsSelection = ({
  endpoints,
}: Omit<ITypeSelectorProps, 'chainTypes'>) => {
  const {
    selectedMainnetIds,
    selectedTestnetIds,
    selectedDevnetIds,
    onChange: onFormChange,
  } = useProjectFormValues();

  const allAvailableMainnetIds = endpoints.mainnet
    .map(endpoint => endpoint.chains[0].id)
    // zetachain is testnet only but has custom config that includes mainnet.
    // So we need to filter this endpoint from available mainnet ids
    .filter(chainId => chainId !== ChainID.ZETACHAIN)
    // JSON-RPC and REST Tendermint subchains have the same path,
    // so should we ignore JSON-RPC endpoints and show REST
    .filter(chainId => !tendermintRpcChains.includes(chainId));

  const allAvailableTestnetIds = endpoints.testnet
    .map(endpoint => endpoint.chains[0].id)
    // JSON-RPC and REST Tendermint subchains have the same path,
    // so should we ignore JSON-RPC endpoints and show REST
    .filter(chainId => !tendermintRpcChains.includes(chainId));

  const allAvailableDevnetIds = endpoints.devnet.map(
    endpoint => endpoint.chains[0].id,
  );

  const areAllMainnetIdsSelected = allAvailableMainnetIds.every(id =>
    selectedMainnetIds.includes(id),
  );

  const areAllTestnetIdsSelected = allAvailableTestnetIds.every(id =>
    selectedTestnetIds.includes(id),
  );

  const areAllDevnetIdsSelected = allAvailableDevnetIds.every(id =>
    selectedDevnetIds.includes(id),
  );

  const areAllAvailableChainsSelected =
    areAllMainnetIdsSelected &&
    areAllTestnetIdsSelected &&
    areAllDevnetIdsSelected;

  const hasMainnetIdsSelected = endpoints.mainnet.some(endpoint =>
    selectedMainnetIds.includes(endpoint.chains[0].id),
  );

  const hasTestnetIdsSelected = endpoints.testnet.some(endpoint =>
    selectedTestnetIds.includes(endpoint.chains[0].id),
  );

  const hasDevnetIdsSelected = endpoints.devnet.some(endpoint =>
    selectedDevnetIds.includes(endpoint.chains[0].id),
  );

  const hasCurrentChainSelectedIds =
    hasMainnetIdsSelected || hasTestnetIdsSelected || hasDevnetIdsSelected;

  const handleChangeAll = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        const newMainnetIds = [
          ...new Set([...selectedMainnetIds, ...allAvailableMainnetIds]),
        ];
        const newTestnetIds = [
          ...new Set([...selectedTestnetIds, ...allAvailableTestnetIds]),
        ];
        const newDevnetIds = [
          ...new Set([...selectedDevnetIds, ...allAvailableDevnetIds]),
        ];

        onFormChange(ChainStepFields.selectedMainnetIds, newMainnetIds);
        onFormChange(ChainStepFields.selectedTestnetIds, newTestnetIds);
        onFormChange(ChainStepFields.selectedDevnetIds, newDevnetIds);
      } else {
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
      }
    },
    [
      allAvailableDevnetIds,
      allAvailableMainnetIds,
      allAvailableTestnetIds,
      onFormChange,
      selectedDevnetIds,
      selectedMainnetIds,
      selectedTestnetIds,
    ],
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleChangeAll(event.target.checked);

  return {
    onChange,
    isChecked: areAllAvailableChainsSelected,
    isIndeterminate:
      hasCurrentChainSelectedIds && !areAllAvailableChainsSelected,
  };
};
