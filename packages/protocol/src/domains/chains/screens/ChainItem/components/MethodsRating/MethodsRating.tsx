import React from 'react';
import { Box } from '@material-ui/core';

import { Header } from './components/Header';
import { Table } from './components/Table';

import { useMethodsRating } from './hooks/useMethodsRating';
import { useStyles } from './MethodsRatingStyles';

export const MethodsRating = () => {
  const classes = useStyles();

  const { period, requests, setChainType, switchPeriod } = useMethodsRating();

  return (
    <Box className={classes.requestsRatingRoot}>
      <Header
        period={period}
        setChainType={setChainType}
        switchPeriod={switchPeriod}
      />
      <Table requests={requests} />
    </Box>
  );
};
