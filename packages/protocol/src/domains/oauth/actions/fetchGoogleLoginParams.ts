import { MultiService } from 'modules/api/MultiService';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { web3Api } from 'store/queries';
import { resetAuthData } from 'domains/auth/store/authSlice';

import { buildOauthRedirectionUrl } from '../utils/buildOauthRedirectionUrl';

export const {
  endpoints: { fetchGoogleLoginParams },
  useLazyFetchGoogleLoginParamsQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    fetchGoogleLoginParams: build.query<string, void>({
      queryFn: createNotifyingQueryFn(async (_arg, { dispatch }) => {
        const service = MultiService.getService();

        const data = await service
          .getAccountingGateway()
          .getGoogleLoginParams();

        const googleAuthUrl = buildOauthRedirectionUrl(data);

        // Added to prevent `Wrong secret code` error when logging in via
        // another email
        dispatch(resetAuthData());

        window.location.replace(googleAuthUrl);

        return { data: buildOauthRedirectionUrl(data) };
      }),
    }),
  }),
});
