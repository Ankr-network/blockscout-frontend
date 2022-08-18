import React from 'react';

import { Box } from '@material-ui/core';
import { Header } from './components/Header';
import { StakeBarChart } from 'modules/common/components/StakeBarChart';
import { useMethodCallStyles } from './useMethodCallStyles';
import { NoData } from './components/NoData';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { StatsTimeframe } from 'domains/chains/types';
import { t } from 'common';

interface IMethodCallsProps {
  data: TopRequestsResultData;
  timeframe: StatsTimeframe;
}

export const MethodCalls = ({ data, timeframe }: IMethodCallsProps) => {
  const classes = useMethodCallStyles();

  return (
    <Box className={classes.root}>
      <Header />
      {data.list.length > 0 ? (
        <StakeBarChart result={data} timeframe={timeframe} />
      ) : (
        <NoData
          title={t('chain-item.method-calls.no-data.title')}
          content={t('chain-item.method-calls.no-data.content')}
        />
      )}
    </Box>
  );
};
