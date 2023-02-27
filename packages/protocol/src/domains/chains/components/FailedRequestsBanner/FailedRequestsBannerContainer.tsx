import { Timeframe } from 'domains/chains/types';
import { FailedRequestsBanner } from './FailedRequestsBanner';
import { Queries } from 'modules/common/components/Queries/Queries';
import { IFailedRequestsBannerResponse } from 'domains/chains/utils/failedRequestsBannerUtils';
import { useFailedRequestsBanner } from './useFailedRequestsBanner';

interface IFailedRequestsBannerContainerProps {
  timeframe: Timeframe;
}

const DEFAULT_FAILD_DATA = {
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
    <Queries<IFailedRequestsBannerResponse> queryStates={[userRequestsState]}>
      {({ data }) => (
        <FailedRequestsBanner
          timeframe={timeframe}
          data={data ?? DEFAULT_FAILD_DATA}
        />
      )}
    </Queries>
  );
};
