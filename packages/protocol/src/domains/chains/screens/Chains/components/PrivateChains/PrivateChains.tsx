import { ChainsList } from '../ChainsList';
import { ChainsSortSelect } from '../ChainsSortSelect';
import { UsageSummary } from '../UsageSummary';
import { ExpiredTokenBanner } from 'domains/auth/components/ExpiredTokenBanner';
import { usePrivateChainsData } from './PrivateChainsUtils';
import { BaseChains } from '../BaseChains';

export const PrivateChains = () => {
  const {
    chains,
    allChains,
    credentials,
    loading,
    setSortType,
    sortType,
    switchStatsTimeframe,
    timeframe,
  } = usePrivateChainsData();

  return (
    <BaseChains
      top={
        <>
          <ExpiredTokenBanner />
          {credentials && (
            <UsageSummary
              timeframe={timeframe}
              switchTimeframe={switchStatsTimeframe}
            />
          )}
        </>
      }
      select={<ChainsSortSelect sortType={sortType} onSelect={setSortType} />}
      loading={loading}
    >
      <ChainsList
        chains={chains}
        allChains={allChains}
        sortType={sortType}
        timeframe={timeframe}
      />
    </BaseChains>
  );
};
