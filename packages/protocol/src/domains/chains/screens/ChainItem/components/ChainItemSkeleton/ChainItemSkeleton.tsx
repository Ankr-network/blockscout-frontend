import { ChainItemHeaderSkeleton } from '../ChainItemHeader/components/ChainItemHeaderSkeleton';
import { ChainItemWithCodeSampleSkeleton } from '../ChainItemWithCodeSampleSkeleton';
import { RequestsChartSkeleton } from 'modules/common/components/RequestsChart/RequestsChartSkeleton';
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
