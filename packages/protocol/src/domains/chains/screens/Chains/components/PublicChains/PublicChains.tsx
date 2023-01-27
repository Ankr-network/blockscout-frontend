import { NoReactSnap } from 'uiKit/NoReactSnap';
import { ChainsSortSelect } from 'domains/chains/components/ChainsSortSelect';
import { ReactSnapChainsLinksGenerator } from 'domains/chains/components/ReactSnapChainsLinksGenerator';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePublicChains } from './hooks/usePublicChains';
import { usePublicChainsData } from './hooks/usePublicChainsData';
import { PublicChainsList } from './components/PublicChainsList';

export const PublicChains = () => {
  const { chains, allChains, loading, setSortType, sortType, timeframe } =
    usePublicChainsData();

  const { processedChains, chainsDictionary } = usePublicChains({
    allChains,
    chains,
    sortType,
  });

  return (
    <BaseChains
      loading={loading}
      select={<ChainsSortSelect sortType={sortType} onSelect={setSortType} />}
    >
      <NoReactSnap
        fallback={<ReactSnapChainsLinksGenerator chains={allChains} />}
      >
        <PublicChainsList
          timeframe={timeframe}
          chains={processedChains}
          chainsDictionary={chainsDictionary}
        />
      </NoReactSnap>
    </BaseChains>
  );
};
