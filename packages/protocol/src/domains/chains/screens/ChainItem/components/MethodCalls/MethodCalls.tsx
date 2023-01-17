import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';

import { Header } from './components/Header';
import { NoData } from './components/NoData';
import { StakeBarChart } from 'modules/common/components/StakeBarChart';
import { Timeframe } from 'domains/chains/types';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';
import { useMethodCallStyles } from './useMethodCallStyles';

interface IMethodCallsProps {
  loading: boolean;
  data: TopRequestsResultData;
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
      <Header timeframe={timeframe} />
      {loading ? (
        <div className={classes.loading}>
          <OverlaySpinner />
        </div>
      ) : (
        <>
          {data.list.length > 0 ? (
            <div className={classes.content}>
              <StakeBarChart result={data} timeframe={timeframe} />
            </div>
          ) : (
            <div className={classes.noData}>
              <NoData />
            </div>
          )}
        </>
      )}
    </Box>
  );
};
