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
    searchContent,
    setSearchContent,
    timeframe,
  } = usePrivateChainsData();

  const { processedChains } = usePrivateChains({
    allChains,
    chains,
    sortType,
    searchContent,
  });

  return (
    <BaseChains
      top={<PrivateChainsTop timeframe={timeframe} />}
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
        isPublic={false}
      />
    </BaseChains>
  );
};
