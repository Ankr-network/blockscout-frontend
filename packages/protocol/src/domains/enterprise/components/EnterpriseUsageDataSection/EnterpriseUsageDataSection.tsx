import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from 'domains/chains/types';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { Tab } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { MethodCalls } from 'domains/chains/screens/ChainItem/components/MethodCalls';
import { RequestsChart } from 'domains/chains/screens/ChainItem/components/RequestsChart';
import { PrivateUsageSummary } from 'domains/chains/screens/ChainItem/components/UsageDataSection/components/PrivateUsageDataSection/components/PrivateUsageSummary';
import { useDataUsageSectionStyles } from 'domains/chains/screens/ChainItem/components/UsageDataSection/UsageDataSectionStyles';

import { EnterpriseUsageDataControls } from '../EnterpriseUsageDataControls';
import { useEnterpriseUsageData } from './useEnterpriseUsageData';
import { useEnterpriseApiKeySelect } from '../EnterpriseApiKeysSelect/useEnterpriseApiKeySelect';
import { EnterpriseClientJwtManagerItem } from '../../store/selectors';

interface EnterpriseUsageDataSectionProps {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  timeframeTabs: Tab<Timeframe>[];
  timeframe: Timeframe;
  apiKeys: EnterpriseClientJwtManagerItem[];
}

export const EnterpriseUsageDataSection = ({
  chain,
  chainType,
  chainSubType,
  group,
  timeframeTabs,
  timeframe,
  apiKeys,
}: EnterpriseUsageDataSectionProps) => {
  const { options, handleSetOption, selectedOption } =
    useEnterpriseApiKeySelect(apiKeys);

  const {
    error,
    isConnecting,
    loading,
    totalRequests,
    totalRequestsHistory,
    userTopRequests,
  } = useEnterpriseUsageData({
    chain,
    chainType,
    chainSubType,
    group,
    timeframe,
  });

  const { classes } = useDataUsageSectionStyles();

  return (
    <div className={classes.usageDataSection}>
      {error ? (
        <div className={classes.error}>
          <QueryError error={error} />
        </div>
      ) : (
        <>
          <EnterpriseUsageDataControls
            tabs={timeframeTabs}
            timeframe={timeframe}
            options={options}
            handleSetOption={handleSetOption}
            selectedOption={selectedOption}
            apiKeys={apiKeys}
          />
          <div className={classes.row}>
            <PrivateUsageSummary
              loading={loading}
              timeframe={timeframe}
              totalRequests={totalRequests}
              isCostHidden
            />
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
              isCostHidden
            />
          )}
        </>
      )}
    </div>
  );
};
