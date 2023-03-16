import { BaseChains } from 'domains/chains/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { usePrivateChainsData } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsData';
import { usePrivateChains } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChains';
import { ChainsNewList } from '../ChainsNewList';
import { PrivateChainsTop } from 'domains/chains/screens/Chains/components/PrivateChains/PrivateChainsTop';

export const PrivateChainsNew = () => {
  const {
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
    searchContent,
    setSearchContent,
  } = usePrivateChainsData();

  const { processedChains } = usePrivateChains({
    allChains,
    chains,
    sortType,
    searchContent,
  });

  return (
    <BaseChains
      top={
        <PrivateChainsTop
          timeframe={timeframe}
          switchStatsTimeframe={switchStatsTimeframe}
        />
      }
      loading={loading}
      baseChainsHeader={
        <BaseChainsHeader
          sortType={sortType}
          setSortType={setSortType}
          searchContent={searchContent}
          setSearchContent={setSearchContent}
        />
      }
    >
      <ChainsNewList
        timeframe={timeframe}
        chains={processedChains}
        switchTimeframe={switchStatsTimeframe}
        isPublic={false}
      />
    </BaseChains>
  );
};
