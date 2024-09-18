import { ChainID } from '@ankr.com/chains-list';

import {
  kavaTendermintRpcChains,
  tendermintRpcChains,
} from 'modules/endpoints/constants/groups';
import { GroupedEndpoints } from 'modules/endpoints/types';
import { useProjectFormValues } from 'domains/projects/hooks/useProjectFormValues';
import { isTestnetOnlyChain } from 'domains/chains/utils/isTestnetOnlyChain';

const isNotTendermintRpc = (chainId: ChainID) =>
  !tendermintRpcChains.includes(chainId) &&
  !kavaTendermintRpcChains.includes(chainId);

export const useAvailableIds = (endpoints: GroupedEndpoints) => {
  const {
    selectedBeaconMainnetIds,
    selectedBeaconTestnetIds,
    selectedDevnetIds,
    selectedMainnetIds,
    selectedOpnodeMainnetIds,
    selectedOpnodeTestnetIds,
    selectedTestnetIds,
  } = useProjectFormValues();

  const allAvailableMainnetIds = endpoints.mainnet
    .map(endpoint => endpoint.chains[0].id)
    // zetachain is testnet only but has custom config that includes mainnet.
    // So we need to filter this endpoint from available mainnet ids
    .filter(chainId => !isTestnetOnlyChain(chainId))
    // JSON-RPC and REST Tendermint subchains have the same path,
    // so should we ignore JSON-RPC endpoints and show REST
    .filter(isNotTendermintRpc);

  const allAvailableTestnetIds = endpoints.testnet
    .map(endpoint => endpoint.chains[0].id)
    // JSON-RPC and REST Tendermint subchains have the same path,
    // so should we ignore JSON-RPC endpoints and show REST
    .filter(isNotTendermintRpc);

  const allAvailableDevnetIds = endpoints.devnet.map(
    endpoint => endpoint.chains[0].id,
  );

  const allAvailableBeaconMainnetIds = endpoints.mainnet
    .flatMap(endpoint => endpoint.chains[0].beacons?.flatMap(item => item.id))
    .filter(Boolean) as ChainID[];

  const allAvailableBeaconTestnetIds = endpoints.testnet
    .flatMap(endpoint => endpoint.chains[0].beacons?.flatMap(item => item.id))
    .filter(Boolean) as ChainID[];

  const allAvailableOpnodeMainnetIds = endpoints.mainnet
    .flatMap(endpoint => endpoint.chains[0].opnodes?.flatMap(item => item.id))
    .filter(Boolean) as ChainID[];

  const allAvailableOpnodeTestnetIds = endpoints.testnet
    .flatMap(endpoint => endpoint.chains[0].opnodes?.flatMap(item => item.id))
    .filter(Boolean) as ChainID[];

  const areAllMainnetIdsSelected = allAvailableMainnetIds.every(id =>
    selectedMainnetIds.includes(id),
  );

  const areAllTestnetIdsSelected = allAvailableTestnetIds.every(id =>
    selectedTestnetIds.includes(id),
  );

  const areAllDevnetIdsSelected = allAvailableDevnetIds.every(id =>
    selectedDevnetIds.includes(id),
  );

  const areAllavailableBeaconMainnetIdsSelected =
    allAvailableBeaconMainnetIds.every(id =>
      selectedBeaconMainnetIds.includes(id),
    );

  const areAllavailableBeaconTestnetIdsSelected =
    allAvailableBeaconTestnetIds.every(id =>
      selectedBeaconTestnetIds.includes(id),
    );

  const areAllavailableOpnodeMainnetIdsSelected =
    allAvailableOpnodeMainnetIds.every(id =>
      selectedOpnodeMainnetIds.includes(id),
    );

  const areAllavailableOpnodeTestnetIdsSelected =
    allAvailableOpnodeTestnetIds.every(id =>
      selectedOpnodeTestnetIds.includes(id),
    );

  const areAllAvailableChainsSelected =
    areAllMainnetIdsSelected &&
    areAllTestnetIdsSelected &&
    areAllDevnetIdsSelected &&
    areAllavailableBeaconMainnetIdsSelected &&
    areAllavailableBeaconTestnetIdsSelected &&
    areAllavailableOpnodeMainnetIdsSelected &&
    areAllavailableOpnodeTestnetIdsSelected;

  const hasMainnetIdsSelected = endpoints.mainnet.some(endpoint =>
    selectedMainnetIds.includes(endpoint.chains[0].id),
  );

  const hasTestnetIdsSelected = endpoints.testnet.some(endpoint =>
    selectedTestnetIds.includes(endpoint.chains[0].id),
  );

  const hasDevnetIdsSelected = endpoints.devnet.some(endpoint =>
    selectedDevnetIds.includes(endpoint.chains[0].id),
  );

  const hasBeaconMainnetIdsSelected = endpoints.mainnet.some(({ beacons }) => {
    return beacons?.some(({ chains }) =>
      selectedBeaconMainnetIds.includes(chains[0].id),
    );
  });

  const hasBeaconTestnetIdsSelected = endpoints.testnet.some(({ beacons }) => {
    return beacons?.some(({ chains }) =>
      selectedBeaconTestnetIds.includes(chains[0].id),
    );
  });

  const hasOpnodeMainnetIdsSelected = endpoints.mainnet.some(({ opnodes }) => {
    return opnodes?.some(({ chains }) =>
      selectedOpnodeMainnetIds.includes(chains[0].id),
    );
  });

  const hasOpnodeTestnetIdsSelected = endpoints.testnet.some(({ opnodes }) => {
    return opnodes?.some(({ chains }) =>
      selectedOpnodeTestnetIds.includes(chains[0].id),
    );
  });

  const hasCurrentChainSelectedIds =
    hasMainnetIdsSelected ||
    hasTestnetIdsSelected ||
    hasDevnetIdsSelected ||
    hasBeaconMainnetIdsSelected ||
    hasBeaconTestnetIdsSelected ||
    hasOpnodeMainnetIdsSelected ||
    hasOpnodeTestnetIdsSelected;

  return {
    allAvailableMainnetIds,
    allAvailableTestnetIds,
    allAvailableDevnetIds,
    allAvailableBeaconMainnetIds,
    allAvailableBeaconTestnetIds,
    allAvailableOpnodeMainnetIds,
    allAvailableOpnodeTestnetIds,
    areAllAvailableChainsSelected,
    hasCurrentChainSelectedIds,
  };
};
