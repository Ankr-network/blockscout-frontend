import { OauthLoginProvider } from 'multirpc-sdk';

import { setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

import { fetchAssociatedAccounts } from './fetchAssociatedAccounts';

export const {
  endpoints: { setGithubLoginName },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    setGithubLoginName: build.query<null, void>({
      queryFn: async (_args, { dispatch }) => {
        const { data } = await dispatch(fetchAssociatedAccounts.initiate());

        const associatedAccount = data?.find(
          account => account.provider === OauthLoginProvider.Github,
        );

        const hasGoogleProvider = data?.some(
          account => account.provider === OauthLoginProvider.Google,
        );

        if (associatedAccount) {
          dispatch(
            setAuthData({
              loginName: associatedAccount?.login,
              hasGoogleProvider,
            }),
          );
        }

        return { data: null };
      },
    }),
  }),
});
