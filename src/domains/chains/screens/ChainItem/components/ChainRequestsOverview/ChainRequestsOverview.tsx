import React from 'react';
import classNames from 'classnames';
import BigNumber from 'bignumber.js';
import { Timeframe } from '@ankr.com/multirpc';
import { Typography } from '@material-ui/core';

import { t } from 'modules/i18n/utils/intl';
import { ChainRequestsChart } from '../ChainRequestsChart';
import { RequestsPeriodInfo } from './RequestsPeriodInfo';
import { useStyles } from './useStyles';
import { formatNumber } from '../ChainItemDetails/ChainItemDetailsUtils';

interface ChainRequestsOverviewProps {
  className?: string;
  totalRequests: {
    '24h': BigNumber;
    '7d'?: BigNumber;
    '30d'?: BigNumber;
  };
  totalRequestsHistory?: Record<string, number>;
  timeframe: Timeframe;
  onClick: (timeframe: Timeframe) => void;
  dataFor7dLoading: boolean;
  dataFor30dLoading: boolean;
}

export const ChainRequestsOverview = ({
  className,
  totalRequests,
  totalRequestsHistory,
  onClick,
  timeframe,
  dataFor7dLoading,
  dataFor30dLoading,
}: ChainRequestsOverviewProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.container}>
        <div className={classes.mobileRequests}>
          <Typography
            variant="subtitle2"
            noWrap
            className={classes.mobileRequestsTitle}
          >
            {t('chain-item.details.total-requests')}
          </Typography>
          <Typography
            variant="h3"
            noWrap
            className={classes.mobileRequestsSubtitle}
          >
            {formatNumber(totalRequests?.[timeframe])}
          </Typography>
        </div>
        <div className={classes.info}>
          <RequestsPeriodInfo
            timeframe="24h"
            description={t('chain-item.details.total-requests-24h')}
            title={formatNumber(totalRequests?.['24h'])}
            onClick={() => onClick('24h')}
            isActive={timeframe === '24h'}
          />
          <RequestsPeriodInfo
            timeframe="7d"
            description={t('chain-item.details.total-requests-7d')}
            title={formatNumber(totalRequests?.['7d'])}
            onClick={() => onClick('7d')}
            isActive={timeframe === '7d'}
            isLoading={dataFor7dLoading}
          />
          <RequestsPeriodInfo
            timeframe="30d"
            description={t('chain-item.details.total-requests-30d')}
            title={formatNumber(totalRequests?.['30d'])}
            onClick={() => onClick('30d')}
            isActive={timeframe === '30d'}
            isLoading={dataFor30dLoading}
          />
        </div>
      </div>
      {totalRequestsHistory &&
        Object.keys(totalRequestsHistory).length !== 0 && (
          <ChainRequestsChart
            requestsLog={totalRequestsHistory}
            timeframe={timeframe}
          />
        )}
    </div>
  );
};
