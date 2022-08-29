import React from 'react';

import { Box } from '@material-ui/core';
import { Header } from './components/Header';
import { StakeBarChart } from 'modules/common/components/StakeBarChart';
import { useMethodCallStyles } from './useMethodCallStyles';
import { NoData } from './components/NoData';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { StatsTimeframe } from 'domains/chains/types';
import { t } from 'common';
import { Spinner } from 'ui';

interface IMethodCallsProps {
  loading: boolean;
  data: TopRequestsResultData;
  timeframe: StatsTimeframe;
}

export const MethodCalls = ({
  loading,
  data,
  timeframe,
}: IMethodCallsProps) => {
  const classes = useMethodCallStyles();

  return (
    <Box className={classes.root}>
      <Header />
      {loading ? (
        <div className={classes.content}>
          <Spinner />
        </div>
      ) : (
        <>
          {data.list.length > 0 ? (
            <StakeBarChart result={data} timeframe={timeframe} />
          ) : (
            <NoData
              title={t('chain-item.method-calls.no-data.title')}
              content={t('chain-item.method-calls.no-data.content')}
            />
          )}
        </>
      )}
    </Box>
  );
};
