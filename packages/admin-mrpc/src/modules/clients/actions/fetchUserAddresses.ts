import {
  GetUserAddressesResponse,
  GetUserAddressesRequest,
} from 'multirpc-sdk';
import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useFetchUserAddressesQuery,
  endpoints: { fetchUserAddresses },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserAddresses: build.query<
      GetUserAddressesResponse,
      GetUserAddressesRequest
    >({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const userAddressesResponse = await backofficeGateway.getUserAddresses({
          address,
        });

        return {
          data: userAddressesResponse,
        };
      },
    }),
  }),
  overrideExisting: true,
});
