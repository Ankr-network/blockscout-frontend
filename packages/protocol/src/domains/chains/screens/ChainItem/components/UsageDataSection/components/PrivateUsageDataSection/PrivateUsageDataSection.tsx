import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType, Timeframe } from 'domains/chains/types';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { Tab } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodCalls } from '../../../MethodCalls';
import { RequestsByIP } from '../../../RequestsByIP';
import { RequestsChart } from '../../../RequestsChart';
import { RequestsMap } from '../../../RequestsMap';
import { TimeframeTabs } from '../../../TimeframeTabs';
import { UsageSummary } from '../../../UsageSummary';
import { usePrivateUsageData } from './usePrivateUsageData';
import { useDataUsageSectionStyles } from '../../UsageDataSectionStyles';
import { useIsRequestsMapVisible } from '../../UsageDataSectionUtils';

export interface PrivateUsageDataSectionProps {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const PrivateUsageDataSection = ({
  chain,
  chainType,
  group,
  timeframe,
  timeframeTabs,
}: PrivateUsageDataSectionProps) => {
  const classes = useDataUsageSectionStyles();

  const {
    countries,
    error,
    isConnecting,
    loading,
    totalCached,
    totalCost,
    totalRequests,
    totalRequestsHistory,
    userTopRequests,
    userTopRequestsIp,
  } = usePrivateUsageData({ chain, chainType, group, timeframe });

  const isRequestsMapVisible = useIsRequestsMapVisible(countries);

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
            tabs={timeframeTabs}
            timeframe={timeframe}
          />
          <UsageSummary
            cachedRequests={totalCached}
            className={classes.usageSummary}
            isLoggedIn
            loading={loading}
            timeframe={timeframe}
            totalCost={totalCost}
            totalRequests={totalRequests}
          />
          <RequestsChart
            isConnecting={isConnecting}
            isLoggedIn
            loading={loading}
            timeframe={timeframe}
            totalRequestsHistory={totalRequestsHistory}
          />
          {userTopRequests && (
            <MethodCalls
              data={userTopRequests}
              loading={loading}
              timeframe={timeframe}
            />
          )}
          {userTopRequestsIp && (
            <RequestsByIP data={userTopRequestsIp} loading={loading} />
          )}
          {isRequestsMapVisible && (
            <RequestsMap
              loading={loading}
              countries={countries}
              timeframe={timeframe}
            />
          )}
        </>
      )}
    </div>
  );
};
