import { NoReactSnap } from 'uiKit/NoReactSnap';
import { BaseChains } from 'modules/common/components/BaseChains';
import { usePublicChainsData } from 'domains/chains/screens/ChainsListPage/components/PublicChains/hooks/usePublicChainsData';
import { usePublicChains } from 'domains/chains/screens/ChainsListPage/components/PublicChains/hooks/usePublicChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { PERIOD } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';

import { ChainsList } from '../ChainsList';
import { processTestnetOnlyChains } from '../../utils/processTestnetOnlyChains';
import { useNetworksConfigurations } from '../../utils/useNetworksConfigurations';
import { PublicChainItem } from './components/PublicChainItem';

export const PublicChains = () => {
  const {
    allChains,
    chains,
    loading,
    searchContent,
    setSearchContent,
    setSortType,
    sortType,
    timeframe,
  } = usePublicChainsData();

  const { chainsDictionary, processedChains } = usePublicChains({
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
