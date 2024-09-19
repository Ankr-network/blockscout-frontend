import { AuthProviderEnum } from 'multirpc-sdk';

import { web3Api } from 'store/queries/web3Api';
import { MultiService } from 'modules/api/MultiService';
import {
  AUTH_REDIRECT_URL,
  BACKOFFICE_AUTH_APPLICATION_NAME,
} from 'modules/common/const';

export const {
  useLazyFetchAuthLinkQuery,
  endpoints: { fetchAuthLink },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchAuthLink: build.query<string, AuthProviderEnum>({
      queryFn: async provider => {
        const service = await MultiService.getWeb3Service();
        const uAuthGateway = await service.getUAuthGateway();

        const data = await uAuthGateway.getAuthLink({
          provider,
          redirectUrl: AUTH_REDIRECT_URL,
          application: BACKOFFICE_AUTH_APPLICATION_NAME,
        });

        return {
          data: data?.result.oauthCompleteUrl || '',
        };
      },
    }),
  }),
  overrideExisting: true,
});
