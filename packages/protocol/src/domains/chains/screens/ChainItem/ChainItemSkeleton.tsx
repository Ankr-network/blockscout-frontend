import { ChainItemHeaderSkeleton } from './components/ChainItemHeader/components/ChainItemHeaderSkeleton';
import { RequestsChartSkeleton } from './components/RequestsChart/RequestsChartSkeleton';
import { useStyles } from './ChainItemStyles';

export const ChainItemSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.chainDetailsWrapper}>
      <ChainItemHeaderSkeleton />
      <RequestsChartSkeleton />
    </div>
  );
};
