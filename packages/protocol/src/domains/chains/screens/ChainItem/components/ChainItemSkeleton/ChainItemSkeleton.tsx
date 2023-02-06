import { ChainItemHeaderSkeleton } from '../ChainItemHeader/components/ChainItemHeaderSkeleton';
import { RequestsChartSkeleton } from '../RequestsChart/RequestsChartSkeleton';
import { useChainItemSkeletonStyles } from './useChainItemSkeletonStyles';

export const ChainItemSkeleton = () => {
  const { classes } = useChainItemSkeletonStyles();

  return (
    <div className={classes.root}>
      <ChainItemHeaderSkeleton />
      <RequestsChartSkeleton />
    </div>
  );
};
