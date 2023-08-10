import { usePrivateChainsInfo } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsInfo';
import { Chain, ChainID } from 'domains/chains/types';
import { tendermintRpcChains } from 'modules/endpoints/constants/groups';

// https://ankrnetwork.atlassian.net/browse/MRPC-3404 TODO: beacons, opnodes

const mapProjectChains = (chain: Chain) => {
  const { testnets: chainTestnets } = chain;

  const testnets = chainTestnets?.flatMap(testnet => {
    const { extensions: testnetExtensions = [] } = testnet;

    if (testnetExtensions.length > 0) {
      return [testnet, ...testnetExtensions];
    }

    return testnet;
  });

  if (chain.id === ChainID.SECRET || chain.id === ChainID.ZETACHAIN) {
    return {
      ...chain,
      // JSON-RPC and REST Tendermint subchains have the same path,
      // so should we ignore JSON-RPC endpoints and show REST
      extensions: chain.extensions?.filter(
        extension => !tendermintRpcChains.includes(extension.id),
      ),
      testnets,
    };
  }

  return {
    ...chain,
    testnets,
  };
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
