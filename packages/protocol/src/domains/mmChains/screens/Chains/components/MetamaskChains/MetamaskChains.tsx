import { NoReactSnap } from 'uiKit/NoReactSnap';
import { ChainsSortSelect } from 'domains/chains/components/ChainsSortSelect';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePublicChainsData } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChainsData';
import { usePublicChains } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChains';
import { MetamaskChainsList } from '../MetamaskChainsList';
import { useMetamaskChains } from './MetamaskChainsUtils';

export const MetamaskChains = () => {
  const { chains, allChains, loading, setSortType, sortType, timeframe } =
    usePublicChainsData();

  const { processedChains, chainsDictionary } = usePublicChains({
    allChains,
    chains,
    sortType,
  });

  const metamaskChains = useMetamaskChains(processedChains);

  return (
    <BaseChains
      loading={loading}
      select={<ChainsSortSelect sortType={sortType} onSelect={setSortType} />}
    >
      <NoReactSnap>
        <MetamaskChainsList
          timeframe={timeframe}
          chains={metamaskChains}
          chainsDictionary={chainsDictionary}
        />
      </NoReactSnap>
    </BaseChains>
  );
};
