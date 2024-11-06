import { BlockchainStatsTopRequests } from 'multirpc-sdk';
import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { Timeframe } from '@ankr.com/chains-list';

import { Header } from './components/Header';
import { MethodCallsTable } from './components/MethodCallsTable';
import { useMethodCallStyles } from './useMethodCallStyles';

interface IMethodCallsProps {
  loading: boolean;
  data: BlockchainStatsTopRequests[];
  timeframe: Timeframe;
  isCostHidden?: boolean;
}

export const MethodCalls = ({
  data,
  isCostHidden,
  loading,
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
        <MethodCallsTable data={data} isCostHidden={isCostHidden} />
      )}
    </Box>
  );
};
