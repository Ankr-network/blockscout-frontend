import { Timeframe } from 'domains/chains/types';
import { FailedRequestsBanner } from './FailedRequestsBanner';
import { Queries } from 'modules/common/components/Queries/Queries';
import { IFailedRequestsBannerResponse } from 'domains/chains/utils/failedRequestsBannerUtils';
import { useFailedRequestsBanner } from './useFailedRequestsBanner';
import { FailedRequestsBannerSkeleton } from './FailedRequestsBannerSkeleton';

interface IFailedRequestsBannerContainerProps {
  timeframe: Timeframe;
}

const DEFAULT_FAILED_DATA = {
  total: '',
  rejectedRequestsCount: '',
  rate: '',
  list: [],
};

export const FailedRequestsBannerContainer = ({
  timeframe,
}: IFailedRequestsBannerContainerProps) => {
  const { userRequestsState } = useFailedRequestsBanner(timeframe);

  return (
    <Queries<IFailedRequestsBannerResponse>
      queryStates={[userRequestsState]}
      spinner={<FailedRequestsBannerSkeleton />}
    >
      {({ data }) => (
        <FailedRequestsBanner
          timeframe={timeframe}
          data={data ?? DEFAULT_FAILED_DATA}
        />
      )}
    </Queries>
  );
};
