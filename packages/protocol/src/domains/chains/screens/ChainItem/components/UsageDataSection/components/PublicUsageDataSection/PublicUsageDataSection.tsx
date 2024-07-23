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
import { TabSize } from 'modules/common/components/SecondaryTab';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { RequestsChart } from '../../../RequestsChart';
import { RequestsMap } from '../../../RequestsMap';
import { usePublicUsageData } from './usePublicUsageData';
import { useDataUsageSectionStyles } from '../../UsageDataSectionStyles';
import { PublicUsageSummary } from './components/PublicUsageSummary';
import { TimeframeSection } from '../PrivateUsageDataSection/components/TimeframeSection';
import { ItemHeader } from '../../../ItemHeader';
import { usageDataSectionTranslation } from '../../translation';

export interface PublicUsageDataSectionProps {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  group: EndpointGroup;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const PublicUsageDataSection = ({
  chain,
  chainSubType,
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
  } = usePublicUsageData({ chain, chainType, chainSubType, group, timeframe });

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
        <>
          <Paper className={classes.statisticsPaper}>
            <ItemHeader
              isLabelHidden
              timeframe={timeframe}
              title={t(keys.networkUsage)}
            />
            <div className={classes.row}>
              <PublicUsageSummary
                cachedRequests={totalCached}
                loading={loading}
                timeframe={timeframe}
                totalRequests={totalRequests}
                isCachedRequestsHidden={isMultichain(chain.id)}
              />
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
          </Paper>
        </>
      )}
    </div>
  );
};
