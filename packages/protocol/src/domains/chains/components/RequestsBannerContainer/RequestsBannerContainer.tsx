import { Timeframe } from '@ankr.com/chains-list';

import { Queries } from 'modules/common/components/Queries/Queries';
import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';

import { useRequestsBanner } from '../../hooks/useRequestsBanner';
import { DEFAULT_EMPTY_DATA } from './const';
import { RequestsBanner } from './RequestsBanner';
import { FailedRequestsBannerSkeleton } from '../FailedRequestsBanner/FailedRequestsBannerSkeleton';

interface IRequestsBannerContainerProps {
  total?: string;
  timeframe: Timeframe;
}

export const RequestsBannerContainer = ({
  timeframe,
  total,
}: IRequestsBannerContainerProps) => {
  const { userRequestsState } = useRequestsBanner(timeframe);

  return (
    <Queries<IRequestsBannerResponse>
      disableErrorRender
      queryStates={[userRequestsState]}
      spinner={<FailedRequestsBannerSkeleton />}
    >
      {({ data = DEFAULT_EMPTY_DATA, isError }) => {
        if (isError) return null;

        return (
          <RequestsBanner timeframe={timeframe} data={data} total={total} />
        );
      }}
    </Queries>
  );
};
