import { Timeframe } from 'domains/chains/types';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { Tab } from 'modules/common/hooks/useTabs';
import { MethodCalls } from '../../../../../MethodCalls';
import { RequestsByIP } from '../../../../../RequestsByIP';
import { RequestsChart } from '../../../../../RequestsChart';
import { RequestsMap } from '../../../../../RequestsMap';
import { TimeframeTabs } from '../../../../../TimeframeTabs';
import { PrivateUsageSummary } from '../PrivateUsageSummary';
import { useDataUsageSectionStyles } from '../../../../UsageDataSectionStyles';
import { useIsRequestsMapVisible } from '../../../../UsageDataSectionUtils';
import { LastUserRequests } from '../../../../../LastUserRequests';
import { UsageData } from '../../../../types';

const IS_LAST_USER_REQUESTS_BLOCK_ENABLED = false;

interface PrivateUsageSectionProps extends UsageData {
  timeframeTabs: Tab<Timeframe>[];
  timeframe: Timeframe;
}

export const PrivateUsageSection = ({
  countries,
  error,
  isConnecting,
  loading,
  totalCost,
  totalRequests,
  totalRequestsHistory,
  userTopRequests,
  userTopRequestsIp,
  timeframeTabs,
  timeframe,
}: PrivateUsageSectionProps) => {
  const { classes } = useDataUsageSectionStyles();

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
