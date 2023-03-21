import { NoReactSnap } from 'uiKit/NoReactSnap';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { ReactSnapChainsLinksGenerator } from 'domains/chains/components/ReactSnapChainsLinksGenerator';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePublicChains } from './hooks/usePublicChains';
import { usePublicChainsData } from './hooks/usePublicChainsData';
import { ChainsList } from '../ChainsList';
import { PublicBanner } from './components/PublicBanner';

export const PublicChains = () => {
  const {
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    timeframe,
    switchStatsTimeframe,
    searchContent,
    setSearchContent,
  } = usePublicChainsData();

  const { processedChains } = usePublicChains({
    allChains,
    chains,
    sortType,
    timeframe,
    searchContent,
  });

  return (
    <BaseChains
      loading={loading}
      top={<PublicBanner />}
      baseChainsHeader={
        <BaseChainsHeader
          sortType={sortType}
          setSortType={setSortType}
          searchContent={searchContent}
          setSearchContent={setSearchContent}
        />
      }
    >
      <NoReactSnap
        fallback={<ReactSnapChainsLinksGenerator chains={allChains} />}
      >
        <ChainsList
          timeframe={timeframe}
          chains={processedChains}
          switchTimeframe={switchStatsTimeframe}
          isPublic
        />
      </NoReactSnap>
    </BaseChains>
  );
};
