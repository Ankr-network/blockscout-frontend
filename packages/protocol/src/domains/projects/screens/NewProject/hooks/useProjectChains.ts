import { useMemo } from 'react';

import { usePrivateChainsInfo } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsInfo';
import { Chain, ChainID } from 'domains/chains/types';
import {
  tendermintRpcChains,
  chainGroups,
} from 'modules/endpoints/constants/groups';
import { hasWsFeature } from 'domains/projects/utils/hasWsFeature';
import { getGroupedEndpoints } from 'modules/endpoints/utils/getGroupedEndpoints';

export type ProjectChain = Chain & {
  mainnets?: Chain[];
  beaconsMainnet?: Chain[];
  beaconsTestnet?: Chain[];
  opnodesMainnet?: Chain[];
  opnodesTestnet?: Chain[];
};

const mapProjectChains = (chain: Chain) => {
  const {
    beacons: beaconsMainnet,
    id,
    opnodes: opnodesMainnet,
    testnets: chainTestnets,
  } = chain;

  const endpoints = getGroupedEndpoints({ chain, groups: chainGroups });

  const testnets = chainTestnets?.flatMap(testnet => {
    const { extensions: testnetExtensions = [] } = testnet;

    if (testnetExtensions.length > 0) {
      return [...testnetExtensions];
    }

    return testnet;
  });

  const testnetsWithBeacons = testnets?.filter(({ beacons }) =>
    Boolean(beacons),
  );

  const testnetsWithOpnodes = testnets?.filter(({ opnodes }) =>
    Boolean(opnodes),
  );

  const beaconsTestnetWithFallback =
    testnetsWithBeacons?.flatMap(({ beacons }) => beacons || []) || [];

  const opnodesTestnetWithFallback =
    testnetsWithOpnodes?.flatMap(({ opnodes }) => opnodes || []) || [];

  const beaconsTestnet =
    beaconsTestnetWithFallback?.length > 0
      ? beaconsTestnetWithFallback
      : undefined;

  const opnodesTestnet =
    opnodesTestnetWithFallback?.length > 0
      ? opnodesTestnetWithFallback
      : undefined;

  const chainParams = {
    ...chain,
    mainnets: endpoints.mainnet
      .filter(endpoint => !tendermintRpcChains.includes(endpoint.chains[0].id))
      .map(x => x.chains[0]),
    devnets: endpoints.devnet
      .filter(endpoint => !tendermintRpcChains.includes(endpoint.chains[0].id))
      .map(x => x.chains[0]),
    testnets: endpoints.testnet
      .filter(endpoint => !tendermintRpcChains.includes(endpoint.chains[0].id))
      .map(x => x.chains[0]),
    hasWSFeature: hasWsFeature(chain),
    beaconsMainnet,
    beaconsTestnet,
    opnodesMainnet,
    opnodesTestnet,
  };

  if (
    id !== ChainID.SECRET &&
    id !== ChainID.ZETACHAIN &&
    id !== ChainID.SCROLL &&
    id !== ChainID.SEI
  ) {
    return {
      ...chainParams,
      // JSON-RPC and REST Tendermint subchains have the same path,
      // so should we ignore JSON-RPC endpoints and show REST
      extensions: chain.extensions?.filter(
        extension => !tendermintRpcChains.includes(extension.id),
      ),
    };
  }

  return chainParams;
};

export const useProjectChains = () => {
  const {
    allChains,
    chains = [],
    isLoading,
    isUninitialized,
  } = usePrivateChainsInfo();

  const projectChains = useMemo(() => chains.map(mapProjectChains), [chains]);

  return { allChains, isLoading, isUninitialized, projectChains };
};
