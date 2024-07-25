import { Paper, Typography } from '@mui/material';

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
import { TabSize } from 'modules/common/components/SecondaryTab';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { RequestsChart } from '../../../RequestsChart';
import { RequestsMap } from '../../../RequestsMap';
import { PrivateUsageSummary } from './components/PrivateUsageSummary';
import { useDataUsageSectionStyles } from '../../UsageDataSectionStyles';
import { LastUserRequests } from '../../../LastUserRequests';
import { usePrivateUsageData } from './usePrivateUsageData';
import { TimeframeSection } from './components/TimeframeSection';
import { ItemHeader } from '../../../ItemHeader';
import { usageDataSectionTranslation } from '../../translation';

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
  chainSubType,
  chainType,
  group,
  timeframe,
  timeframeTabs,
}: PrivateUsageDataSectionProps) => {
  const {
    countries,
    error,
    isConnecting,
    loading,
    totalCost,
    totalRequests,
    totalRequestsHistory,
  } = usePrivateUsageData({
    chain,
    chainType,
    chainSubType,
    group,
    timeframe,
  });

  const { selectedProjectEndpointToken, shouldShowTokenManager } =
    useTokenManagerConfigSelector();
  const shouldHideIpsAndRequestsMap =
    shouldShowTokenManager && selectedProjectEndpointToken;

  const { classes } = useDataUsageSectionStyles();

  const { keys, t } = useTranslation(usageDataSectionTranslation);

  return (
    <div className={classes.usageDataSection}>
      <div className={classes.usageSectionTitle}>
        <Typography variant="subtitle1">{t(keys.statistics)}</Typography>
        {!error && (
          <TimeframeSection
            tabs={timeframeTabs}
            timeframe={timeframe}
            size={TabSize.Smallest}
          />
        )}
      </div>

      {error ? (
        <div className={classes.error}>
          <QueryError error={error} />
        </div>
      ) : (
        <Paper className={classes.statisticsPaper}>
          <ItemHeader
            isLabelHidden
            timeframe={timeframe}
            title={t(keys.networkUsage)}
          />
          <div className={classes.row}>
            <PrivateUsageSummary
              loading={loading}
              timeframe={timeframe}
              totalCost={totalCost}
              totalRequests={totalRequests}
              isCostHidden
            />
            {IS_LAST_USER_REQUESTS_BLOCK_ENABLED && <LastUserRequests />}
          </div>
          <ItemHeader
            className={classes.statisticsItemTitle}
            isLabelHidden
            timeframe={timeframe}
            title={t(keys.totalRequests)}
          />
          <RequestsChart
            isConnecting={isConnecting}
            isLoggedIn
            loading={loading}
            timeframe={timeframe}
            totalRequestsHistory={totalRequestsHistory}
            isFlexibleHeight={false}
          />
          {!shouldHideIpsAndRequestsMap && (
            <>
              <ItemHeader
                className={classes.statisticsItemTitle}
                isLabelHidden
                timeframe={timeframe}
                title={t(keys.top10Countries)}
              />
              <RequestsMap
                isTitleHidden
                loading={loading}
                countries={countries}
                timeframe={timeframe}
              />
            </>
          )}
        </Paper>
      )}
    </div>
  );
};
