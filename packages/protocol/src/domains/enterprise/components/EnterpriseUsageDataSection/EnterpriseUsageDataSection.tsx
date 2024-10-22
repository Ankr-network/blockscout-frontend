import { Paper } from '@mui/material';
import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';
import { EnterpriseClientJWT } from 'domains/enterprise/store/selectors';
import { PrivateUsageSummary } from 'domains/chains/screens/ChainPage/components/UsageDataSection/components/PrivateUsageDataSection/components/PrivateUsageSummary';
import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { RequestsChart } from 'domains/chains/screens/ChainPage/components/RequestsChart';
import { Tab } from 'modules/common/hooks/useTabs';
import { useDataUsageSectionStyles } from 'domains/chains/screens/ChainPage/components/UsageDataSection/UsageDataSectionStyles';

import { EnterpriseUsageDataControls } from '../EnterpriseUsageDataControls';
import { useEnterpriseUsageData } from './useEnterpriseUsageData';
import { useEnterpriseApiKeySelect } from '../EnterpriseApiKeysSelect/useEnterpriseApiKeySelect';
import { ItemHeader } from '../../../chains/screens/ChainPage/components/ItemHeader';

interface EnterpriseUsageDataSectionProps {
  apiKeys: EnterpriseClientJWT[];
  chain: Chain;
  chainSubType?: ChainSubType;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
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
