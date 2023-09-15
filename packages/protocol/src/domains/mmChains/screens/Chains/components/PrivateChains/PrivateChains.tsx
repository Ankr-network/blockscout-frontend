import { BaseChains } from 'modules/common/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { usePrivateChains } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChains';
import { usePrivateChainsData } from 'domains/chains/screens/Chains/components/PrivateChains/hooks/usePrivateChainsData';
import { PERIOD } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { useChainListStyles } from 'domains/chains/components/ChainsList/useChainListStyles';

import { useNetworksConfigurations } from '../../utils/useNetworksConfigurations';
import { processTestnetOnlyChains } from '../../utils/processTestnetOnlyChains';
import { ChainsList } from '../ChainsList';
import { PrivateChainItem } from './components/PrivateChainItem';

interface IPrivateChainsProps {
  hasPremium: boolean;
  isFreePremium: boolean;
  hasTotalRequestsLabel?: boolean;
}

export const PrivateChains = ({
  hasPremium,
  isFreePremium,
  hasTotalRequestsLabel,
}: IPrivateChainsProps) => {
  const {
    chains,
    allChains,
    loading,
    setSortType,
    sortType,
    timeframe,
    searchContent,
    setSearchContent,
  } = usePrivateChainsData();

  const { processedChains, chainsDictionary } = usePrivateChains({
    allChains,
    chains: processTestnetOnlyChains(chains),
    sortType,
    searchContent,
  });

  const networksConfigurations = useNetworksConfigurations(processedChains);
  const { classes } = useChainListStyles();

  return (
    <BaseChains loading={loading}>
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
              <PrivateChainItem
                chain={item}
                links={urls}
                name={name}
                period={PERIOD}
                publicChain={chainsDictionary[id]}
                timeframe={timeframe}
                chainId={id}
                hasPremiumDialog={
                  item.premiumOnly && (!hasPremium || isFreePremium)
                }
                hasTotalRequestsLabel={hasTotalRequestsLabel}
              />
            </div>
          );
        })}
      </ChainsList>
    </BaseChains>
  );
};
