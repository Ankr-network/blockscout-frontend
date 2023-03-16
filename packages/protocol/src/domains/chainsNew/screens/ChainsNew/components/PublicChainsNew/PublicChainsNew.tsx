import { NoReactSnap } from 'uiKit/NoReactSnap';
import { ReactSnapChainsLinksGenerator } from 'domains/chains/components/ReactSnapChainsLinksGenerator';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePublicChainsData } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChainsData';
import { usePublicChains } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChains';
import { ChainsNewList } from '../ChainsNewList';
import { PublicBanner } from 'domains/chains/screens/Chains/components/PublicChains/components/PublicBanner';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';

export const PublicChainsNew = () => {
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
        <ChainsNewList
          timeframe={timeframe}
          chains={processedChains}
          switchTimeframe={switchStatsTimeframe}
          isPublic
        />
      </NoReactSnap>
    </BaseChains>
  );
};
