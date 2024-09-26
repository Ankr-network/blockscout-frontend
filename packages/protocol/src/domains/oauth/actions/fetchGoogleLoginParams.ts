import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';

import { buildOauthRedirectionUrl } from '../utils/buildOauthRedirectionUrl';

export const {
  endpoints: { fetchGoogleLoginParams },
  useLazyFetchGoogleLoginParamsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchGoogleLoginParams: build.query<string, void>({
      queryFn: createNotifyingQueryFn(async () => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getGoogleLoginParams();

        return { data: buildOauthRedirectionUrl(data) };
      }),
    }),
  }),
});
