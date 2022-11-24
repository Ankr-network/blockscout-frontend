import { IGetUserRevenueRequest, IGetUserRevenueResponse } from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useFetchUserRevenueQuery,
  endpoints: { fetchUserRevenue },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserRevenue: build.query<
      IGetUserRevenueResponse,
      IGetUserRevenueRequest
    >({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const userRevenueResponse = await backofficeGateway.getUserRevenue({
          address,
        });

        return {
          data: userRevenueResponse,
        };
      },
    }),
  }),
  overrideExisting: true,
});
