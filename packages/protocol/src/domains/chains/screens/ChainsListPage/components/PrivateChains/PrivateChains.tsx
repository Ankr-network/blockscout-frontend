import { BaseChains } from 'modules/common/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { ChainsList } from 'modules/common/components/ChainsList';
import { usePrivateChainsData } from 'hooks/usePrivateChainsData';

import { usePrivateChains } from './hooks/usePrivateChains';
import { PrivateChainsTop } from './PrivateChainsTop';
import { PrivateChainCard } from './components/PrivateChainCard';

export const PrivateChains = () => {
  const { hasPremium } = useAuth();

  const {
    allChains,
    chains,
    loading,
    searchContent,
    setSearchContent,
    setSortType,
    sortType,
    timeframe,
  } = usePrivateChainsData({ ignoreJwtManager: true });

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
              <PrivateChainCard
                key={id}
                chain={item}
                timeframe={timeframe}
                hasTotalRequestsLabel={hasPremium}
                hasPremium={hasPremium}
              />
            );
          })}
        </ChainsList>
      </>
    </BaseChains>
  );
};
