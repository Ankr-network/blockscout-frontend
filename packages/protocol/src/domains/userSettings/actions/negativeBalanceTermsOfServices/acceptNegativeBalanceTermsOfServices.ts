import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';
import { createQueryFnWithErrorHandler } from 'store/utils/createQueryFnWithErrorHandler';

export const {
  endpoints: { acceptNegativeBalanceTermsOfServices },
  useAcceptNegativeBalanceTermsOfServicesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    acceptNegativeBalanceTermsOfServices: build.query<void, string | undefined>(
      {
        queryFn: createQueryFnWithErrorHandler({
          queryFn: async params => {
            const service = MultiService.getService();

            const data = await service
              .getAccountGateway()
              .acceptNegativeBalanceTermsOfServices(params);

            return { data };
          },
        }),
      },
    ),
  }),
});
