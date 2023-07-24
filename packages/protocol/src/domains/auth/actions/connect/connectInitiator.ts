import { web3Api } from 'store/queries';
import { IAuthSlice } from 'domains/auth/store/authSlice';

import { AuthConnectParams } from './types';

// authConnectInitiator - authConnect - authMakeAuthorization
// 1) call authConnectInitiator
// 2) listenerMiddleware will catch authConnectInitiator action
// 3) effect will initiate authConnect, add authorization token and ask user's 2fa status
// 4) if user enabled 2fa, 2fa dialog will be opened
// 5) effect will launch authMakeAuthorization with 2fa code
// 6) authMakeAuthorization - finished action

export const {
  endpoints: { authConnectInitiator },
  useLazyAuthConnectInitiatorQuery,
} = web3Api.injectEndpoints({
  endpoints: build => ({
    authConnectInitiator: build.query<IAuthSlice, AuthConnectParams>({
      queryFn: async () => {
        return { data: {} };
      },
    }),
  }),
});
