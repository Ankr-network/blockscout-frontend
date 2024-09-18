import { ICounterRequest, ICounterResponse } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useLazyFetchCounterByUserQuery,
  endpoints: { fetchCounterByUser },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchCounterByUser: build.query<ICounterResponse, ICounterRequest>({
      queryFn: async ({ user }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const response = await backofficeGateway.getCounter({
          user,
        });

        return {
          data: response || {},
        };
      },
    }),
  }),
  overrideExisting: true,
});
