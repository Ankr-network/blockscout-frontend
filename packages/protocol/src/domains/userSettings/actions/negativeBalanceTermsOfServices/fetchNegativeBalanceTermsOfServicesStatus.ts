import {
  NegativeBalanceTermsOfServicesStatusParams,
  NegativeBalanceTermsOfServicesStatusResponse,
} from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { web3Api } from 'store/queries';

export const {
  endpoints: { fetchNegativeBalanceTermsOfServicesStatus },
  useFetchNegativeBalanceTermsOfServicesStatusQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchNegativeBalanceTermsOfServicesStatus: build.query<
      NegativeBalanceTermsOfServicesStatusResponse,
      NegativeBalanceTermsOfServicesStatusParams | undefined
    >({
      queryFn: async params => {
        const service = MultiService.getService();

        const data = await service
          .getAccountGateway()
          .getNegativeBalanceTermsOfServicesStatus(params);

        return { data };
      },
    }),
  }),
});
