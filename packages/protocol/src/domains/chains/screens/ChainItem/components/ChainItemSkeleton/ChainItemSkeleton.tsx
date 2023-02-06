import { ChainItemHeaderSkeleton } from '../ChainItemHeader/components/ChainItemHeaderSkeleton';
import { RequestsChartSkeleton } from '../RequestsChart/RequestsChartSkeleton';
import { ChainItemWithCodeSampleSkeleton } from '../ChainItemWithCodeSampleSkeleton';
import { useChainItemSkeletonStyles } from './useChainItemSkeletonStyles';

export const ChainItemSkeleton = ({
  withCodeSample,
}: {
  withCodeSample?: boolean;
}) => {
  const { classes } = useChainItemSkeletonStyles();

  return (
    <div className={classes.root}>
      {withCodeSample ? (
        <ChainItemWithCodeSampleSkeleton />
      ) : (
        <ChainItemHeaderSkeleton />
      )}
      <RequestsChartSkeleton />
    </div>
  );
};
