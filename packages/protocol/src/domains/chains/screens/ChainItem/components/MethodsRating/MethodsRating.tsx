import React from 'react';
import { Box } from '@material-ui/core';

import { Header } from './components/Header';
import { MethodRequest, StatsTimeframe } from 'domains/chains/types';
import { Table } from './components/Table';
import { prepareRequests } from './utils/prepareRequests';
import { useStyles } from './MethodsRatingStyles';

export interface MethodsRatingProps {
  methodRequests: MethodRequest[];
  switchTimeframe: () => void;
  timeframe: StatsTimeframe;
}

export const MethodsRating = ({
  methodRequests,
  switchTimeframe,
  timeframe,
}: MethodsRatingProps) => {
  const classes = useStyles();

  const requests = prepareRequests(methodRequests);

  return (
    <Box className={classes.requestsRatingRoot}>
      <Header switchTimeframe={switchTimeframe} timeframe={timeframe} />
      <Table requests={requests} />
    </Box>
  );
};
