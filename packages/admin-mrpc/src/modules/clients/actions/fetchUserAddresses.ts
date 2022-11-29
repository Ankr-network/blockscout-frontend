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
      Omit<GetUserAddressesResponse, 'public_key'>,
      GetUserAddressesRequest
    >({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();
        await authorizeBackoffice();
        const userAddressesResponse = await backofficeGateway.getUserAddresses({
          address,
        });

        const actionData = {
          data: {
            ...userAddressesResponse,
            addresses: [
              ...userAddressesResponse.addresses.map(userAddress => ({
                address: userAddress.address,
                type: userAddress.type,
                publicKey: userAddress.publicKey || userAddress.public_key,
              })),
            ],
          },
        };

        return actionData;
      },
    }),
  }),
  overrideExisting: true,
});
