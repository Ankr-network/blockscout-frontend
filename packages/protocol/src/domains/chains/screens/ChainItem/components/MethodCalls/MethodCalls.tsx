import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { PrivateStatTopRequests } from 'multirpc-sdk';

import { Timeframe } from 'domains/chains/types';

import { Header } from './components/Header';
import { MethodCallsTable } from './components/MethodCallsTable';
import { useMethodCallStyles } from './useMethodCallStyles';

interface IMethodCallsProps {
  loading: boolean;
  data: PrivateStatTopRequests[];
  timeframe: Timeframe;
}

export const MethodCalls = ({
  loading,
  data,
  timeframe,
}: IMethodCallsProps) => {
  const { classes } = useMethodCallStyles();

  return (
    <Box className={classes.root}>
      <Header timeframe={timeframe} data={data} />
      {loading ? (
        <div className={classes.loading}>
          <OverlaySpinner />
        </div>
      ) : (
        <MethodCallsTable data={data} />
      )}
    </Box>
  );
};
