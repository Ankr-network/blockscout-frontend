import { NoReactSnap } from 'uiKit/NoReactSnap';
import { BaseChains } from 'domains/chains/components/BaseChains';
import { usePublicChainsData } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChainsData';
import { usePublicChains } from 'domains/chains/screens/Chains/components/PublicChains/hooks/usePublicChains';
import { ChainsList } from '../ChainsList';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { processTestnetOnlyChains } from '../../utils/processTestnetOnlyChains';
import { useNetworksConfigurations } from '../../utils/useNetworksConfigurations';
import { PublicChainItem } from './components/PublicChainItem';
import { PERIOD } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';

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

  const { processedChains, chainsDictionary } = usePublicChains({
    allChains,
    chains: processTestnetOnlyChains(chains),
    sortType,
    timeframe,
    searchContent,
  });

  const networksConfigurations = useNetworksConfigurations(processedChains);
  const { classes } = useChainListStyles();

  return (
    <BaseChains loading={loading}>
      <NoReactSnap>
        <>
          <BaseChainsHeader
            sortType={sortType}
            setSortType={setSortType}
            searchContent={searchContent}
            setSearchContent={setSearchContent}
          />
          <ChainsList chains={networksConfigurations}>
            {networksConfigurations.map(item => {
              const { id, name, urls } = item;

              return (
                <div className={classes.wrapper} key={id}>
                  <PublicChainItem
                    chain={item}
                    links={urls}
                    name={name}
                    period={PERIOD}
                    publicChain={chainsDictionary[id]}
                    timeframe={timeframe}
                    chainId={id}
                    hasPremiumDialog={item.premiumOnly}
                  />
                </div>
              );
            })}
          </ChainsList>
        </>
      </NoReactSnap>
    </BaseChains>
  );
};
