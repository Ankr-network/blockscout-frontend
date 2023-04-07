import { Timeframe } from 'domains/chains/types';
import { FailedRequestsBanner } from './FailedRequestsBanner';
import { Queries } from 'modules/common/components/Queries/Queries';
import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';
import { useRequestsBanner } from '../../hooks/useRequestsBanner';
import { DEFAULT_EMPTY_DATA } from '../RequestsBannerContainer/const';
import { FailedRequestsBannerSkeleton } from './FailedRequestsBannerSkeleton';

interface IFailedRequestsBannerContainerProps {
  timeframe: Timeframe;
}

export const FailedRequestsBannerContainer = ({
  timeframe,
}: IFailedRequestsBannerContainerProps) => {
  const { userRequestsState } = useRequestsBanner(timeframe);

  return (
    <Queries<IRequestsBannerResponse>
      disableErrorRender
      queryStates={[userRequestsState]}
      spinner={<FailedRequestsBannerSkeleton />}
    >
      {({ data = DEFAULT_EMPTY_DATA, isError }) => {
        if (isError) return null;

        return <FailedRequestsBanner timeframe={timeframe} data={data} />;
      }}
    </Queries>
  );
};
