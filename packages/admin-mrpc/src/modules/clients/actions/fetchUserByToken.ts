import { IUserByTokenRequest, IUserByTokenResponse } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';

import { MultiService } from '../../api/MultiService';
import { authorizeBackoffice } from '../utils/authorizeBackoffice';

export const {
  useLazyFetchUserByTokenQuery,
  endpoints: { fetchUserByToken },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchUserByToken: build.query<IUserByTokenResponse[], IUserByTokenRequest>({
      queryFn: async ({ token }) => {
        const service = await MultiService.getWeb3Service();
        const backofficeGateway = await service.getBackofficeGateway();

        await authorizeBackoffice();

        const response = await backofficeGateway
          .getUserByToken({
            token,
          })
          .catch(e => {
            // eslint-disable-next-line no-console
            console.log(e);
          });

        return {
          data: response ? [response] : [],
        };
      },
    }),
  }),
  overrideExisting: true,
});
