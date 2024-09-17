import { IApiUserGroupParams } from 'multirpc-sdk';
import { Timeframe } from '@ankr.com/chains-list';

import {
  handleData,
  IRequestsBannerResponse,
} from 'domains/chains/utils/requestsBannerUtils';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

interface FetchUserRequestsParams extends IApiUserGroupParams {
  timeframe: Timeframe;
  userToken: string;
}

const getValue = (timeframe: Timeframe) => {
  switch (timeframe) {
    case Timeframe.Hour:
      return '1h';

    case Timeframe.Day:
      return '24h';

    case Timeframe.Week:
      return '7d';

    case Timeframe.Month:
    default:
      return '30d';
  }
};

export const {
  endpoints: { chainsFetchUserRequests },
  useLazyChainsFetchUserRequestsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchUserRequests: build.query<
      IRequestsBannerResponse,
      FetchUserRequestsParams
    >({
      queryFn: async ({ group, timeframe, userToken }) => {
        const service = MultiService.getService();

        const result = await service.getAccountingGateway().getUserRequests({
          timeframe: getValue(timeframe),
          userToken,
          group,
        });

        return {
          data: handleData(result, timeframe),
        };
      },
    }),
  }),
  overrideExisting: true,
});
