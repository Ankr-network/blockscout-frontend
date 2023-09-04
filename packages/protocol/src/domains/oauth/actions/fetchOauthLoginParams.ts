import { OauthLoginProvider } from 'multirpc-sdk';

import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { buildOauthRedirectionUrl } from '../utils/buildOauthRedirectionUrl';

export const {
  endpoints: { fetchOauthLoginParams },
  useLazyFetchOauthLoginParamsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchOauthLoginParams: build.query<string, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getOauthLoginParams({ provider: OauthLoginProvider.Github });

        return { data: buildOauthRedirectionUrl(data) };
      }),
    }),
  }),
});
