import { usePrivateChainsInfo } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsInfo';
import { ChainID } from 'domains/chains/types';

// https://ankrnetwork.atlassian.net/browse/MRPC-3404 TODO: beacons, opnodes
// https://ankrnetwork.atlassian.net/browse/MRPC-3407 TODO: zetachain, nervos, secret

const uncoveredChains = [ChainID.ZETACHAIN, ChainID.NERVOS, ChainID.SECRET];

export const useProjectChains = () => {
  const [chains = [], allChains, isLoading] = usePrivateChainsInfo();

  const projectChains = chains.map(chain => {
    const { testnets } = chain;

    return {
      ...chain,
      testnets: testnets?.flatMap(testnet => {
        const { extensions: testnetExtensions = [] } = testnet;

        if (testnetExtensions.length > 0) {
          return [testnet, ...testnetExtensions];
        }

        return testnet;
      }),
    };
  });

  const coveredChains = projectChains.filter(
    chain => !uncoveredChains.includes(chain.id),
  );

  return {
    projectChains: coveredChains,
    allChains,
    isLoading,
  };
};
