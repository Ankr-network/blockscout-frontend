import { IETHAddressesResponse } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { RequestType, web3Api } from 'store/queries';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { RootState } from 'store';

export const {
  endpoints: { fetchEthAddresses },
  useFetchEthAddressesQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchEthAddresses: build.query<IETHAddressesResponse | null, void>({
      providesTags: [RequestType.BindingAccounts],
      queryFn: async (_args, { getState }) => {
        const service = MultiService.getService();

        const { authorizationToken } = selectAuthData(getState() as RootState);

        if (!authorizationToken) return { data: null }

        const data = await service
          .getAccountingGateway()
          .getETHAddresses(authorizationToken);

        return { data };
      },
    }),
  }),
});
