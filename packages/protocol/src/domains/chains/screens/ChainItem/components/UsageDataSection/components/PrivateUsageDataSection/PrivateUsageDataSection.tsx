import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from 'modules/chains/types';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { Tab } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

import { MethodCalls } from '../../../MethodCalls';
import { RequestsByIP } from '../../../RequestsByIP';
import { RequestsChart } from '../../../RequestsChart';
import { RequestsMap } from '../../../RequestsMap';
import { TimeframeTabs } from '../../../TimeframeTabs';
import { PrivateUsageSummary } from './components/PrivateUsageSummary';
import { useDataUsageSectionStyles } from '../../UsageDataSectionStyles';
import { LastUserRequests } from '../../../LastUserRequests';
import { usePrivateUsageData } from './usePrivateUsageData';
import { TimeframeSection } from './components/TimeframeSection';

const IS_LAST_USER_REQUESTS_BLOCK_ENABLED = false;

interface PrivateUsageDataSectionProps {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  timeframeTabs: Tab<Timeframe>[];
  timeframe: Timeframe;
}

export const PrivateUsageDataSection = ({
  chain,
  chainType,
  chainSubType,
  group,
  timeframeTabs,
  timeframe,
}: PrivateUsageDataSectionProps) => {
  const {
    countries,
    error,
    isConnecting,
    loading,
    totalCost,
    totalRequests,
    totalRequestsHistory,
    userTopRequests,
    userTopRequestsIp,
  } = usePrivateUsageData({
    chain,
    chainType,
    chainSubType,
    group,
    timeframe,
  });

  const { shouldShowTokenManager, selectedProjectEndpointToken } =
    useTokenManagerConfigSelector();
  const shouldHideIpsAndRequestsMap =
    shouldShowTokenManager && selectedProjectEndpointToken;

  const { classes } = useDataUsageSectionStyles();

  return (
    <div className={classes.usageDataSection}>
      {error ? (
        <div className={classes.error}>
          <QueryError error={error} />
        </div>
      ) : (
        <>
          {shouldShowTokenManager ? (
            <TimeframeSection tabs={timeframeTabs} timeframe={timeframe} />
          ) : (
            <TimeframeTabs
              className={classes.timeframe}
              tabs={timeframeTabs}
              timeframe={timeframe}
            />
          )}
          <div className={classes.row}>
            <PrivateUsageSummary
              loading={loading}
              timeframe={timeframe}
              totalCost={totalCost}
              totalRequests={totalRequests}
            />
            {IS_LAST_USER_REQUESTS_BLOCK_ENABLED && <LastUserRequests />}
          </div>
          <RequestsChart
            isConnecting={isConnecting}
            isLoggedIn
            loading={loading}
            timeframe={timeframe}
            totalRequestsHistory={totalRequestsHistory}
            isFlexibleHeight={false}
          />
          {userTopRequests && (
            <MethodCalls
              data={userTopRequests}
              loading={loading}
              timeframe={timeframe}
            />
          )}
          {userTopRequestsIp && !shouldHideIpsAndRequestsMap && (
            <RequestsByIP data={userTopRequestsIp} loading={loading} />
          )}
          {!shouldHideIpsAndRequestsMap && (
            <RequestsMap
              loading={loading}
              countries={countries}
              // Since request by ip only support 30d by backend, so hard code it first. When backend support all the timeframe should be remove it
              timeframe={Timeframe.Month}
            />
          )}
        </>
      )}
    </div>
  );
};
