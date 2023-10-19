import { OauthLoginProvider } from 'multirpc-sdk';

import { setAuthData } from 'domains/auth/store/authSlice';
import { web3Api } from 'store/queries';

import { fetchAssociatedAccounts } from './fetchAssociatedAccounts';

export const {
  endpoints: { setGithubLoginNameAndEmail },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    setGithubLoginNameAndEmail: build.query<null, void>({
      queryFn: async (_args, { dispatch }) => {
        const { data } = await dispatch(fetchAssociatedAccounts.initiate());

        const associatedAccount = data?.find(
          account => account.provider === OauthLoginProvider.Github,
        );

        const associatedGoogleAccount = data?.find(
          account => account.provider === OauthLoginProvider.Google,
        );

        dispatch(
          setAuthData({
            loginName: associatedAccount?.login,
            email: associatedGoogleAccount?.email,
          }),
        );

        return { data: null };
      },
    }),
  }),
});
