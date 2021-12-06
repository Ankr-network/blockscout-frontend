import React, { ReactNode, useCallback } from 'react';
import classNames from 'classnames';
import { Timeframe } from '@ankr.com/multirpc';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

import { t } from 'modules/i18n/utils/intl';
import { ChainRequestsChart } from '../ChainRequestsChart';
import { useStyles } from './useStyles';
import { Spinner } from 'uiKit/Spinner';

interface ChainRequestsOverviewProps {
  className?: string;
  totalRequestsHistory?: Record<string, number>;
  timeframe: Timeframe;
  onClick: (timeframe: Timeframe) => void;
  children: ReactNode;
  loading: boolean;
}

export const ChainRequestsOverview = ({
  className,
  totalRequestsHistory,
  onClick,
  timeframe,
  children,
  loading,
}: ChainRequestsOverviewProps) => {
  const classes = useStyles();

  const handleTimeframe = useCallback(
    (event: React.MouseEvent<HTMLElement>, value: Timeframe) => {
      onClick(value);
    },
    [onClick],
  );

  return (
    <div className={classNames(classes.root, className)}>
      {children}
      {loading ? (
        <div className={classes.infoSkeleton}>
          <Spinner />
        </div>
      ) : (
        totalRequestsHistory &&
        Object.keys(totalRequestsHistory).length !== 0 && (
          <ChainRequestsChart
            requestsLog={totalRequestsHistory}
            timeframe={timeframe}
          />
        )
      )}
      <div className={classes.buttonGroup}>
        <ToggleButtonGroup
          exclusive
          onChange={handleTimeframe}
          value={timeframe}
          className={classes.toggleButtonGroup}
        >
          <ToggleButton value="30d">
            {t('chain-item.timeframe.30-days')}
          </ToggleButton>
          <ToggleButton value="7d">
            {t('chain-item.timeframe.7-days')}
          </ToggleButton>
          <ToggleButton value="24h">
            {t('chain-item.timeframe.24-hours')}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};
