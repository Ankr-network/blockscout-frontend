import { OverlaySpinner } from '@ankr.com/ui';

import { NoReactSnap } from 'uiKit/NoReactSnap';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { ReactSnapChainsLinksGenerator } from 'domains/chains/components/ReactSnapChainsLinksGenerator';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePublicChains } from './hooks/usePublicChains';
import { usePublicChainsData } from './hooks/usePublicChainsData';
import { PublicChainsList } from './components/PublicChainsList';
import { PublicBanner } from './components/PublicBanner';

export const PublicChains = () => {
  const {
    isLoggedIn,
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    searchContent,
    setSearchContent,
    timeframe,
  } = usePublicChainsData();

  const { processedChains, chainsDictionary } = usePublicChains({
    allChains,
    chains,
    sortType,
    timeframe,
    searchContent,
  });

  return (
    <BaseChains
      loading={loading}
      shouldShowReminderDialog={isLoggedIn}
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
        fallback={
          <>
            <ReactSnapChainsLinksGenerator chains={allChains} />
            <OverlaySpinner />
          </>
        }
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
