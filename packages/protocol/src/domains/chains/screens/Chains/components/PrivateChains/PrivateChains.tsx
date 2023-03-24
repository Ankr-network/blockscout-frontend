import { usePrivateChainsData } from './hooks/usePrivateChainsData';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { usePrivateChains } from './hooks/usePrivateChains';
import { ChainsList } from '../ChainsList';
import { PrivateChainsTop } from './PrivateChainsTop';

export const PrivateChains = () => {
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
      shouldShowReminderDialog
      baseChainsHeader={
        <BaseChainsHeader
          sortType={sortType}
          setSortType={setSortType}
          searchContent={searchContent}
          setSearchContent={setSearchContent}
        />
      }
    >
      <ChainsList
        timeframe={timeframe}
        chains={processedChains}
        switchTimeframe={switchStatsTimeframe}
        isPublic={false}
      />
    </BaseChains>
  );
};
