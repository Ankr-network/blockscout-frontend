import React from 'react';
import { Box } from '@material-ui/core';

import { Chart } from './components/Chart';
import { Header } from './components/Header';

import { useChart } from './hooks/useChart';
import { useStyles } from './ExpenseChartStyles';

export const ExpenseChart = () => {
  const {
    currency,
    isLoading,
    setTimeframe,
    switchCurrency,
    timeframe,
    transactions,
    xFormatter,
    yFormatter,
  } = useChart();

  const classes = useStyles();

  return (
    <Box className={classes.expenseChartRoot}>
      <Header
        currency={currency}
        setTimeframe={setTimeframe}
        switchCurrency={switchCurrency}
        timeframe={timeframe}
      />
      <Chart
        currency={currency}
        isLoading={isLoading}
        transactions={transactions}
        xFormatter={xFormatter}
        yFormatter={yFormatter}
      />
    </Box>
  );
};
