import { usePrivateChainsInfo } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsInfo';
import { Chain, ChainID } from 'domains/chains/types';
import { tendermintRpcChains } from 'modules/endpoints/constants/groups';

export type ProjectChain = Chain & {
  beaconsMainnet?: Chain[];
  beaconsTestnet?: Chain[];
  opnodesMainnet?: Chain[];
  opnodesTestnet?: Chain[];
};

const mapProjectChains = (chain: Chain) => {
  const {
    testnets: chainTestnets,
    beacons: beaconsMainnet,
    opnodes: opnodesMainnet,
  } = chain;

  const testnets = chainTestnets?.flatMap(testnet => {
    const { extensions: testnetExtensions = [] } = testnet;

    if (testnetExtensions.length > 0) {
      return [testnet, ...testnetExtensions];
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
    testnets,
    beaconsMainnet,
    beaconsTestnet,
    opnodesMainnet,
    opnodesTestnet,
  };

  if (chain.id === ChainID.SECRET || chain.id === ChainID.ZETACHAIN) {
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
  const [chains = [], allChains, isLoading] = usePrivateChainsInfo();

  const projectChains = chains.map(mapProjectChains);

  return {
    projectChains,
    allChains,
    isLoading,
  };
};
