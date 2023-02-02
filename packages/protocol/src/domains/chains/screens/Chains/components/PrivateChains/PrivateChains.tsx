import { ChainsSortSelect } from 'domains/chains/components/ChainsSortSelect';
import { UsageSummary } from './components/UsageSummary';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { usePrivateChainsData } from './hooks/usePrivateChainsData';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePrivateChains } from './hooks/usePrivateChains';
import { PrivateChainsList } from './components/PrivateChainsList';

export const PrivateChains = () => {
  const {
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
  } = usePrivateChainsData();

  const { processedChains, chainsDictionary } = usePrivateChains({
    allChains,
    chains,
    sortType,
  });

  return (
    <BaseChains
      top={
        <>
          <ExpiredTokenBanner />
          <UsageSummary
            timeframe={timeframe}
            switchTimeframe={switchStatsTimeframe}
          />
        </>
      }
      select={<ChainsSortSelect sortType={sortType} onSelect={setSortType} />}
      loading={loading}
    >
      <PrivateChainsList
        timeframe={timeframe}
        chains={processedChains}
        chainsDictionary={chainsDictionary}
      />
    </BaseChains>
  );
};
