import { Queries } from 'modules/common/components/Queries/Queries';
import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';
import { useTimeframe } from 'domains/chains/screens/ChainItem/components/ChainItemSections/hooks/useTimeframe';
import { useRequestsBanner } from '../../hooks/useRequestsBanner';
import { DEFAULT_EMPTY_DATA } from './const';
import { RequestsBanner } from './RequestsBanner';

export const RequestsBannerContainer = () => {
  const { timeframe, timeframeTabs } = useTimeframe();
  const { userRequestsState } = useRequestsBanner(timeframe);

  return (
    <Queries<IRequestsBannerResponse>
      disableErrorRender
      queryStates={[userRequestsState]}
    >
      {({ data = DEFAULT_EMPTY_DATA, isError }) => {
        if (isError) return null;

        return (
          <RequestsBanner
            timeframe={timeframe}
            timeframeTabs={timeframeTabs}
            data={data}
          />
        );
      }}
    </Queries>
  );
};
