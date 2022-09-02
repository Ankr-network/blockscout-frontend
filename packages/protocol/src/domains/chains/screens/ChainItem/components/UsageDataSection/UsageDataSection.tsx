import { IApiChain } from 'domains/chains/api/queryChains';
import { IS_30D_PRIVATE_STATISTICS_DISABLED } from 'domains/chains/constants/timeframes';
import { ChainType, Timeframe } from 'domains/chains/types';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { Tab } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodCalls } from '../MethodCalls';
import { RequestsByIP } from '../RequestsByIP';
import { RequestsChart } from '../RequestsChart';
import { RequestsMap } from '../RequestsMap';
import { TimeframeTabs } from '../TimeframeTabs';
import { UsageSummary } from '../UsageSummary';
import { useUsageData } from './hooks/useUsageData';
import { useDataUsageSectionStyles } from './UsageDataSectionStyles';
import { useIsRequestsMapVisible } from './UsageDataSectionUtils';

export interface UsageDataSectionProps {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const UsageDataSection = ({
  chain,
  chainType,
  group,
  timeframe,
  timeframeTabs,
}: UsageDataSectionProps) => {
  const classes = useDataUsageSectionStyles();

  const {
    countries,
    error,
    isConnecting,
    isWalletConnected,
    loading,
    totalCached,
    totalCost,
    totalRequests,
    totalRequestsHistory,
    userTopRequests,
    userTopRequestsIp,
  } = useUsageData({ chain, chainType, group, timeframe });

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
            isWalletConnected={isWalletConnected}
            loading={loading}
            timeframe={timeframe}
            totalCost={totalCost}
            totalRequests={totalRequests}
          />
          <RequestsChart
            isConnecting={isConnecting}
            isWalletConnected={isWalletConnected}
            loading={loading}
            timeframe={timeframe}
            totalRequestsHistory={totalRequestsHistory}
          />
          {isWalletConnected && userTopRequests && (
            <MethodCalls
              data={userTopRequests}
              loading={loading}
              timeframe={timeframe}
            />
          )}
          {isWalletConnected &&
            userTopRequestsIp &&
            !IS_30D_PRIVATE_STATISTICS_DISABLED && (
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
