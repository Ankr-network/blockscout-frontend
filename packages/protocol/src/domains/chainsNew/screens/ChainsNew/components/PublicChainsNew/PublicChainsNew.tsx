import { NoReactSnap } from 'uiKit/NoReactSnap';
import { ChainsSortSelect } from 'domains/chains/components/ChainsSortSelect';
import { ReactSnapChainsLinksGenerator } from 'domains/chains/components/ReactSnapChainsLinksGenerator';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePublicChainsData } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChainsData';
import { usePublicChains } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChains';
import { ChainsNewList } from '../ChainsNewList';
import { InfoBanner } from 'domains/chains/components/InfoBanner';

export const PublicChainsNew = () => {
  const {
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    timeframe,
    switchStatsTimeframe,
  } = usePublicChainsData();

  const { processedChains } = usePublicChains({
    allChains,
    chains,
    sortType,
    timeframe,
  });

  return (
    <BaseChains
      loading={loading}
      top={!loading && <InfoBanner />}
      select={<ChainsSortSelect sortType={sortType} onSelect={setSortType} />}
    >
      <NoReactSnap
        fallback={<ReactSnapChainsLinksGenerator chains={allChains} />}
      >
        <ChainsNewList
          timeframe={timeframe}
          chains={processedChains}
          switchTimeframe={switchStatsTimeframe}
        />
      </NoReactSnap>
    </BaseChains>
  );
};
