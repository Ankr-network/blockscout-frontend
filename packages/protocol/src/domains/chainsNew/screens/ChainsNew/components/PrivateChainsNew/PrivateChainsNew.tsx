import { ChainsSortSelect } from 'domains/chains/components/ChainsSortSelect';

import { BaseChains } from 'domains/chains/components/BaseChains';
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
  } = usePrivateChainsData();

  const { processedChains } = usePrivateChains({
    allChains,
    chains,
    sortType,
  });

  return (
    <BaseChains
      top={
        <PrivateChainsTop
          timeframe={timeframe}
          switchStatsTimeframe={switchStatsTimeframe}
        />
      }
      select={<ChainsSortSelect sortType={sortType} onSelect={setSortType} />}
      loading={loading}
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
