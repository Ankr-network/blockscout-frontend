import {
  handleData,
  IFailedRequestsBannerResponse,
} from 'domains/chains/utils/failedRequestsBannerUtils';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { valuesMap } from 'domains/chains/components/TimeframeSwitcher/const';
import { Timeframe } from 'domains/chains/types';

export const {
  useLazyChainsFetchFreeRegisteredUserRequestsQuery,
  endpoints: { chainsFetchFreeRegisteredUserRequests },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchFreeRegisteredUserRequests: build.query<
      IFailedRequestsBannerResponse,
      { timeframe: Timeframe; userEndpointToken: string }
    >({
      queryFn: createNotifyingQueryFn(
        async ({ timeframe, userEndpointToken }) => {
          const service = MultiService.getService();

          const result = await service
            .getAccountGateway()
            .getFreeRegisteredUserRequests(
              valuesMap[timeframe],
              userEndpointToken,
            );

          return {
            data: handleData(result, timeframe),
          };
        },
      ),
    }),
  }),
});
