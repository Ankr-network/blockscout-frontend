import {
  GetUsersRegistrationsRequest,
  GetUsersRegistrationsResponse,
} from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import { authorizeBackoffice } from 'modules/clients/utils/authorizeBackoffice';

const mock = {
  addresses: [
    '0xcd49452f7d664df5e4d6c4873a3cdc01574b8712',
    '0x53ac5422f5eb0000a7a8b1e79f2d3a848c50ce46',
  ],
};

const IS_MOCKED = false;

export const {
  useGetUsersRegistrationsQuery,
  useLazyGetUsersRegistrationsQuery,
  endpoints: { getUsersRegistrations },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getUsersRegistrations: build.query<
      GetUsersRegistrationsResponse['addresses'],
      GetUsersRegistrationsRequest
    >({
      queryFn: async params => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = service.getBackofficeGateway();

        await authorizeBackoffice();
        const response = IS_MOCKED
          ? mock
          : await backofficeGateway.getUsersRegistrations(params);

        return {
          data: response.addresses.map(address => address.toLowerCase()),
        };
      },
    }),
  }),
  overrideExisting: true,
});
