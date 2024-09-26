import { Paper } from '@mui/material';
import React from 'react';

import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { ChainProtocolContext } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';
import { isMultichain } from 'modules/chains/utils/isMultichain';

import { RequestsChart } from '../../../RequestsChart';
import { RequestsMap } from '../../../RequestsMap';
import { PrivateUsageSummary } from './components/PrivateUsageSummary';
import { useDataUsageSectionStyles } from '../../UsageDataSectionStyles';
import { LastUserRequests } from '../../../LastUserRequests';
import { ItemHeader } from '../../../ItemHeader';
import { usageDataSectionTranslation } from '../../translation';
import { usePrivateUsageSection } from './usePrivateUsageSection';
import { PublicUsageDataSectionProps } from '../PublicUsageDataSection';
import { UsageSectionHeader } from '../UsageSectionHeader';

const IS_LAST_USER_REQUESTS_BLOCK_ENABLED = false;

interface PrivateUsageDataSectionProps extends PublicUsageDataSectionProps {}

export const PrivateUsageDataSection = ({
  chain,
  timeframe,
  timeframeTabs,
}: PrivateUsageDataSectionProps) => {
  const {
    chainProtocolContext,
    chainSelectorProps,
    countries,
    error,
    isConnecting,
    loading,
    totalCost,
    totalRequests,
    totalRequestsHistory,
  } = usePrivateUsageSection(chain, timeframe);

  const { classes } = useDataUsageSectionStyles();

  const { keys, t } = useTranslation(usageDataSectionTranslation);

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <div className={classes.usageDataSection}>
        {error ? (
          <div className={classes.error}>
            <QueryError error={error} />
          </div>
        ) : (
          <Paper className={classes.statisticsPaper}>
            <UsageSectionHeader
              chainSelectorProps={chainSelectorProps}
              timeframe={timeframe}
              timeframeTabs={timeframeTabs}
              isMultichain={isMultichain(chain.id)}
            />
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
        )}
      </div>
    </ChainProtocolContext.Provider>
  );
};
