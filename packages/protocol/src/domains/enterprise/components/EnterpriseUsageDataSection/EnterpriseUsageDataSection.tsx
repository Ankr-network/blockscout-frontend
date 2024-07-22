import { Paper } from '@mui/material';

import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from 'modules/chains/types';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { Tab } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { RequestsChart } from 'domains/chains/screens/ChainItem/components/RequestsChart';
import { PrivateUsageSummary } from 'domains/chains/screens/ChainItem/components/UsageDataSection/components/PrivateUsageDataSection/components/PrivateUsageSummary';
import { useDataUsageSectionStyles } from 'domains/chains/screens/ChainItem/components/UsageDataSection/UsageDataSectionStyles';
import { EnterpriseClientJwtManagerItem } from 'domains/enterprise/store/selectors';

import { EnterpriseUsageDataControls } from '../EnterpriseUsageDataControls';
import { useEnterpriseUsageData } from './useEnterpriseUsageData';
import { useEnterpriseApiKeySelect } from '../EnterpriseApiKeysSelect/useEnterpriseApiKeySelect';
import { ItemHeader } from '../../../chains/screens/ChainItem/components/ItemHeader';

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
  apiKeys,
  chain,
  chainSubType,
  chainType,
  group,
  timeframe,
  timeframeTabs,
}: EnterpriseUsageDataSectionProps) => {
  const { handleSetOption, options, selectedOption } =
    useEnterpriseApiKeySelect(apiKeys);

  const { error, isConnecting, loading, totalRequests, totalRequestsHistory } =
    useEnterpriseUsageData({
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
          <Paper className={classes.statisticsPaper}>
            <ItemHeader
              isLabelHidden
              timeframe={timeframe}
              title="Network usage"
            />
            <div className={classes.row}>
              <PrivateUsageSummary
                loading={loading}
                timeframe={timeframe}
                totalRequests={totalRequests}
                isCostHidden
              />
            </div>
            <ItemHeader
              className={classes.statisticsItemTitle}
              isLabelHidden
              timeframe={timeframe}
              title="Total requests"
            />
            <RequestsChart
              isConnecting={isConnecting}
              isLoggedIn
              loading={loading}
              timeframe={timeframe}
              totalRequestsHistory={totalRequestsHistory}
              isFlexibleHeight={false}
            />
          </Paper>
        </>
      )}
    </div>
  );
};
