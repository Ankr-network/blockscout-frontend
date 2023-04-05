import {
  handleData,
  IRequestsBannerResponse,
} from 'domains/chains/utils/requestsBannerUtils';
import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { valuesMap } from 'domains/chains/components/TimeframeSwitcher/const';
import { Timeframe } from 'domains/chains/types';

interface FetchUserRequestsParams {
  timeframe: Timeframe;
  userToken: string;
}

export const {
  useLazyChainsFetchUserRequestsQuery,
  useChainsFetchUserRequestsQuery,
  endpoints: { chainsFetchUserRequests },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    chainsFetchUserRequests: build.query<
      IRequestsBannerResponse,
      FetchUserRequestsParams
    >({
      queryFn: async ({ timeframe, userToken }) => {
        const service = MultiService.getService();

        const result = await service
          .getAccountGateway()
          .getUserRequests({ timeframe: valuesMap[timeframe], userToken });

        return {
          data: handleData(result, timeframe),
        };
      },
    }),
  }),
  overrideExisting: true,
});
