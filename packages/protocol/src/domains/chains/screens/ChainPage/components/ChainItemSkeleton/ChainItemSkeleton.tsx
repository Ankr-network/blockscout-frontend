import { RequestsChartSkeleton } from 'modules/common/components/RequestsChart/RequestsChartSkeleton';

import { ChainItemHeaderSkeleton } from '../ChainItemHeader/components/ChainItemHeaderSkeleton';
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
