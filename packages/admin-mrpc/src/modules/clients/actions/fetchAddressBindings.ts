import { IAddressBindingEntity, GetUserAddressesRequest } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';

import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useLazyFetchAddressBindingsQuery,
  endpoints: { fetchAddressBindings },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAddressBindings: build.query<
      IAddressBindingEntity[],
      GetUserAddressesRequest
    >({
      queryFn: async ({ address }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();
        const bindingAddressesResponse =
          await backofficeGateway.getAddressBindings({
            address,
          });

        const actionData = {
          data: bindingAddressesResponse.tokens || [],
        };

        return actionData;
      },
    }),
  }),
  overrideExisting: true,
});
