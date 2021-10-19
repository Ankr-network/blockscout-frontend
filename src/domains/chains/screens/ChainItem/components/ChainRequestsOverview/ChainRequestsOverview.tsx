import React from 'react';
import classNames from 'classnames';
import BigNumber from 'bignumber.js';

import { t } from 'modules/i18n/utils/intl';
import { ChainRequestsChart } from '../ChainRequestsChart';
import { RequestsPeriodInfo } from './RequestsPeriodInfo';
import { useStyles } from './useStyles';
import { formatNumber } from '../ChainItemDetails/ChainItemDetailsUtils';

interface ChainRequestsOverviewProps {
  className?: string;
  totalRequests: BigNumber;
  totalRequestsHistory: Record<string, number>;
}

export const ChainRequestsOverview = ({
  className,
  totalRequests,
  totalRequestsHistory,
}: ChainRequestsOverviewProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.info}>
        <RequestsPeriodInfo
          description={t('chain-item.api-details.total-requests')}
          title={formatNumber(totalRequests)}
        />
      </div>
      <ChainRequestsChart requestsLog={totalRequestsHistory} />
    </div>
  );
};
