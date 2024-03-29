import { t } from '@ankr.com/common';

import { LIFETIME } from 'domains/chains/utils/timeframeUtils';
import { createNotifyingQueryFn } from 'store/utils/createNotifyingQueryFn';
import { createQueryFnWithWeb3ServiceGuard } from 'store/utils/createQueryFnWithWeb3ServiceGuard';
import { web3Api } from 'store/queries';

const noAccessTokenError = new Error(t('error.access-token-error'));

export const {
  endpoints: { authAuthorizeProvider },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authAuthorizeProvider: build.query<string, void>({
      queryFn: createQueryFnWithWeb3ServiceGuard({
        queryFn: createNotifyingQueryFn(async ({ web3Service }) => {
          const accessToken = await web3Service.getAuthorizationToken(LIFETIME);

          if (!accessToken) {
            throw noAccessTokenError;
          }

          return { data: accessToken };
        }),
        fallback: { error: noAccessTokenError },
      }),
    }),
  }),
});
