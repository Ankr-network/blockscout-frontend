import { Paper } from '@mui/material';
import React from 'react';
import { Chain, ChainID, Timeframe } from '@ankr.com/chains-list';

import { QueryError } from 'modules/common/components/QueryError/QueryError';
import { Tab } from 'modules/common/hooks/useTabs';
import { isMultichain } from 'modules/chains/utils/isMultichain';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { ChainProtocolContext } from 'domains/chains/screens/ChainPage/constants/ChainProtocolContext';

import { RequestsChart } from '../../../RequestsChart';
import { RequestsMap } from '../../../RequestsMap';
import { useDataUsageSectionStyles } from '../../UsageDataSectionStyles';
import { PublicUsageSummary } from './components/PublicUsageSummary';
import { ItemHeader } from '../../../ItemHeader';
import { usageDataSectionTranslation } from '../../translation';
import { usePublicUsageSection } from './usePublicUsageSection';
import { UsageSectionHeader } from '../UsageSectionHeader';

export interface PublicUsageDataSectionProps {
  chain: Chain;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const PublicUsageDataSection = ({
  chain,
  timeframe,
  timeframeTabs,
}: PublicUsageDataSectionProps) => {
  const {
    chainProtocolContext,
    chainSelectorProps,
    countries,
    error,
    isConnecting,
    loading,
    totalCached,
    totalRequests,
    totalRequestsHistory,
  } = usePublicUsageSection(chain, timeframe);

  const { keys, t } = useTranslation(usageDataSectionTranslation);

  const { classes } = useDataUsageSectionStyles();

  return (
    <ChainProtocolContext.Provider value={chainProtocolContext}>
      <div className={classes.usageDataSection}>
        {error ? (
          <div className={classes.error}>
            <QueryError error={error} />
          </div>
        ) : (
          <>
            <Paper className={classes.statisticsPaper}>
              <UsageSectionHeader
                chainSelectorProps={chainSelectorProps}
                timeframe={timeframe}
                timeframeTabs={timeframeTabs}
                isSecondLevelSelectorsHidden={chain.id !== ChainID.ETH}
                isMultichain={isMultichain(chain.id)}
              />
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
    </ChainProtocolContext.Provider>
  );
};
