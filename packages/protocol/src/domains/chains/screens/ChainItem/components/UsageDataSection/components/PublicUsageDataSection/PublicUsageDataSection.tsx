import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType, Timeframe } from 'domains/chains/types';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { Tab } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { RequestsChart } from '../../../RequestsChart';
import { RequestsMap } from '../../../RequestsMap';
import { TimeframeTabs } from '../../../TimeframeTabs';
import { usePublicUsageData } from './usePublicUsageData';
import { useDataUsageSectionStyles } from '../../UsageDataSectionStyles';
import { PublicUsageSummary } from './components/PublicUsageSummary';

export interface PublicUsageDataSectionProps {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const PublicUsageDataSection = ({
  chain,
  chainType,
  group,
  timeframe,
  timeframeTabs,
}: PublicUsageDataSectionProps) => {
  const { classes } = useDataUsageSectionStyles();

  const {
    countries,
    error,
    isConnecting,
    loading,
    totalCached,
    totalRequests,
    totalRequestsHistory,
    isLoggedIn,
  } = usePublicUsageData({ chain, chainType, group, timeframe });

  return (
    <div className={classes.usageDataSection}>
      {error ? (
        <div className={classes.error}>
          <QueryError error={error} />
        </div>
      ) : (
        <>
          <TimeframeTabs
            className={classes.timeframe}
            disabled={loading}
            tabs={timeframeTabs}
            timeframe={timeframe}
          />
          <PublicUsageSummary
            cachedRequests={totalCached}
            loading={loading}
            timeframe={timeframe}
            totalRequests={totalRequests}
          />
          <RequestsChart
            isConnecting={isConnecting}
            isLoggedIn={isLoggedIn}
            loading={loading}
            timeframe={timeframe}
            totalRequestsHistory={totalRequestsHistory}
          />
          <RequestsMap
            loading={loading}
            countries={countries}
            timeframe={timeframe}
          />
        </>
      )}
    </div>
  );
};
