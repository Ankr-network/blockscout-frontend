import React from 'react';
import classNames from 'classnames';

import { ChainRequestsChart } from '../ChainRequestsChart';
import { RequestsPeriodInfo } from './RequestsPeriodInfo';
import { useStyles } from './useStyles';

interface ChainRequestsOverviewProps {
  className?: string;
}

export const ChainRequestsOverview = ({
  className,
}: ChainRequestsOverviewProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.info}>
        <RequestsPeriodInfo
          description="Total Requests 30d"
          title="63 472 952"
        />
        <RequestsPeriodInfo description="Total Requests 7d" title="9 382 571" />
        <RequestsPeriodInfo
          description="Total Requests 24h"
          title="1 492 052"
        />
      </div>
      <ChainRequestsChart />
    </div>
  );
};
