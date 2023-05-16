import { web3Api } from 'store/queries';
import { EmptyObject } from './loginByGoogleSecretCode';
import { TwoFAQueryFnParams } from 'store/queries/types';
import { OauthLoginByGoogleSecretCodeParams } from './oauthLoginJwt';

// 1) call oauthLoginInitiator
// 2) listenerMiddleware will catch oauthLoginInitiator
// 3) effect will login user by google code, add authorization token, ask user's 2fa status
// 4) if user enabled 2fa, 2fa dialog will be opened
// 5) effect will launch oauthLoginJwt with 2fa code

export const {
  endpoints: { oauthLoginInitiator },
  useLazyOauthLoginInitiatorQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    oauthLoginInitiator: build.query<
      EmptyObject,
      TwoFAQueryFnParams<OauthLoginByGoogleSecretCodeParams>
    >({
      queryFn: async () => {
        return { data: {} };
      },
    }),
  }),
});
