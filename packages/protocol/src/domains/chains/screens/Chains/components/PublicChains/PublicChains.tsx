import { NoReactSnap } from 'uiKit/NoReactSnap';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { ReactSnapChainsLinksGenerator } from 'domains/chains/components/ReactSnapChainsLinksGenerator';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { UpgradePlanBanner } from 'modules/common/components/UpgradePlanBanner';

import { usePublicChains } from './hooks/usePublicChains';
import { usePublicChainsData } from './hooks/usePublicChainsData';
import { ChainsList } from '../ChainsList';
import { PublicChainCard } from './components/PublicChainCard';

export const PublicChains = () => {
  const {
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    timeframe,
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
    <BaseChains loading={loading} top={<UpgradePlanBanner isPublicUser />}>
      <NoReactSnap
        fallback={<ReactSnapChainsLinksGenerator chains={allChains} />}
      >
        <>
          <BaseChainsHeader
            sortType={sortType}
            setSortType={setSortType}
            searchContent={searchContent}
            setSearchContent={setSearchContent}
          />
          <ChainsList chains={processedChains}>
            {processedChains.map(item => {
              const { id } = item;

              return (
                <PublicChainCard key={id} chain={item} timeframe={timeframe} />
              );
            })}
          </ChainsList>
        </>
      </NoReactSnap>
    </BaseChains>
  );
};
