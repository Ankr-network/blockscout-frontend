import { ESortChainsType, Timeframe } from '@ankr.com/chains-list';
import { PrivateStatsInterval } from 'multirpc-sdk';
import { useState } from 'react';

import { BaseChains } from 'modules/common/components/BaseChains';
import { BaseChainsHeader } from 'domains/chains/components/BaseChainsHeader';
import { ChainsList } from 'modules/common/components/ChainsList';
import { excludeMultiChain } from 'domains/chains/utils/excludeMultiChain';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { selectEnterpriseChains } from 'domains/enterprise/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useChainsSorting } from 'modules/chains/hooks/useChainsSorting';
import { useEnterpriseStats } from 'domains/enterprise/hooks/useEnterpriseStats';
import { useSearch } from 'modules/common/components/Search/hooks/useSearch';

import { EnterpriseChainCard } from '../EnterpriseChainCard';

const defaultInterval = PrivateStatsInterval.MONTH;

export const EnterpriseChainsList = () => {
  const { chains, isLoading } = useAppSelector(selectEnterpriseChains);

  const [sortType, setSortType] = useState<ESortChainsType>(
    ESortChainsType.UsageHighLow,
  );

  const [searchContent, setSearchContent] = useSearch();

  const { stats } = useEnterpriseStats({
    interval: defaultInterval,
    shouldFetch: !isReactSnap,
  });

  const { processedChains } = useChainsSorting({
    chains: chains.filter(excludeMultiChain),
    searchContent,
    sortType,
    timeframe: Timeframe.Day,
    privateStats: stats,
  });

  return (
    <BaseChains loading={isLoading}>
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
              <EnterpriseChainCard
                key={id}
                chain={item}
                timeframe={Timeframe.Month}
                hasTotalRequestsLabel
                hasPremium
              />
            );
          })}
        </ChainsList>
      </>
    </BaseChains>
  );
};
