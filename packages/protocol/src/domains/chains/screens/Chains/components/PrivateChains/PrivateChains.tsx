import { usePrivateChainsData } from './hooks/usePrivateChainsData';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { usePrivateChains } from './hooks/usePrivateChains';
import { ChainsList } from '../ChainsList';
import { PrivateChainsTop } from './PrivateChainsTop';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChainCard } from './components/PrivateChainCard';

export const PrivateChains = () => {
  const { hasPremium } = useAuth();

  const {
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    searchContent,
    setSearchContent,
    timeframe,
  } = usePrivateChainsData(true);

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
