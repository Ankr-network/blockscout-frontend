import { Queries } from 'modules/common/components/Queries/Queries';
import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';
import { useRequestsBanner } from '../../hooks/useRequestsBanner';
import { DEFAULT_EMPTY_DATA } from './const';
import { RequestsBanner } from './RequestsBanner';
import { Timeframe } from 'domains/chains/types';

interface IRequestsBannerContainerProps {
  total?: string;
  timeframe: Timeframe;
}

export const RequestsBannerContainer = ({
  total,
  timeframe,
}: IRequestsBannerContainerProps) => {
  const { userRequestsState } = useRequestsBanner(timeframe);

  return (
    <Queries<IRequestsBannerResponse>
      disableErrorRender
      queryStates={[userRequestsState]}
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
