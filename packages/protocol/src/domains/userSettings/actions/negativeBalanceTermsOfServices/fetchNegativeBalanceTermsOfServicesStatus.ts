import { MultiService } from 'modules/api/MultiService';
import {
  NegativeBalanceTermsOfServicesStatusParams,
  NegativeBalanceTermsOfServicesStatusResponse,
} from 'multirpc-sdk';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

export const {
  endpoints: { fetchNegativeBalanceTermsOfServicesStatus },
  useFetchNegativeBalanceTermsOfServicesStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchNegativeBalanceTermsOfServicesStatus: build.query<
      NegativeBalanceTermsOfServicesStatusResponse,
      NegativeBalanceTermsOfServicesStatusParams | undefined
    >({
      queryFn: createQueryFnWithErrorHandler({
        queryFn: async params => {
          const service = MultiService.getService();

          const data = await service
            .getAccountGateway()
            .getNegativeBalanceTermsOfServicesStatus(params);

          return { data };
        },
      }),
    }),
  }),
});
