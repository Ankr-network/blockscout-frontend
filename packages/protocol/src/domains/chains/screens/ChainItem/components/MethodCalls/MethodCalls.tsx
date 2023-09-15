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
  isCostHidden?: boolean;
}

export const MethodCalls = ({
  loading,
  data,
  timeframe,
  isCostHidden,
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
        <MethodCallsTable data={data} isCostHidden={isCostHidden} />
      )}
    </Box>
  );
};
