import React, { ReactNode, useCallback } from 'react';
import classNames from 'classnames';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

import { ChainRequestsChart } from '../ChainRequestsChart';
import { RequestsChartPlaceholder } from './components/RequestsChartPlaceholder';
import { Spinner } from 'ui';
import { StatsTimeframe } from 'domains/chains/types';
import { isTotalRequestsHistoryNotEmpty } from './utils/isTotalRequestsHistoryNotEmpty';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';

interface ChainRequestsOverviewProps {
  children: ReactNode;
  className?: string;
  isConnecting: boolean;
  isWalletConnected: boolean;
  loading: boolean;
  onClick: (timeframe: StatsTimeframe) => void;
  pristine: boolean;
  timeframe: StatsTimeframe;
  totalRequestsHistory?: Record<string, number>;
}

export const IS_7D_AND_30D_PRIVATE_STATISTICS_DISABLED = true;

export const ChainRequestsOverview = ({
  children,
  className,
  isConnecting,
  isWalletConnected,
  loading,
  onClick,
  pristine,
  timeframe,
  totalRequestsHistory,
}: ChainRequestsOverviewProps) => {
  const classes = useStyles();

  const handleTimeframe = useCallback(
    (_, value: StatsTimeframe) => {
      onClick(value);
    },
    [onClick],
  );

  const placeholder =
    isWalletConnected && !loading ? <RequestsChartPlaceholder /> : null;

  return (
    <div className={classNames(classes.root, className)}>
      {children}
      {loading && pristine ? (
        <div className={classes.infoSkeleton}>
          <Spinner />
        </div>
      ) : (
        <div className={classes.chart}>
          {!isConnecting &&
          isTotalRequestsHistoryNotEmpty(totalRequestsHistory) ? (
            <ChainRequestsChart
              isWalletConnected={isWalletConnected}
              loading={loading}
              requestsLog={totalRequestsHistory}
              timeframe={timeframe}
            />
          ) : (
            placeholder
          )}
        </div>
      )}
      <div className={classes.buttonGroup}>
        <ToggleButtonGroup
          exclusive
          onChange={handleTimeframe}
          value={timeframe}
          className={classes.toggleButtonGroup}
        >
          <ToggleButton value={StatsTimeframe.DAY} disabled={loading}>
            {t('chain-item.timeframe.24-hours')}
          </ToggleButton>
          <ToggleButton
            value={StatsTimeframe.WEEK}
            disabled={
              (isWalletConnected &&
                IS_7D_AND_30D_PRIVATE_STATISTICS_DISABLED) ||
              loading
            }
          >
            {t('chain-item.timeframe.7-days')}
          </ToggleButton>
          <ToggleButton
            value={StatsTimeframe.MONTH}
            disabled={
              (isWalletConnected &&
                IS_7D_AND_30D_PRIVATE_STATISTICS_DISABLED) ||
              loading
            }
          >
            {t('chain-item.timeframe.30-days')}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};
